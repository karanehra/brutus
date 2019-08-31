import "babel-polyfill";
import express from "express";
import { databaseEmitter } from "./emitters/index";
import { INITIALIZE_DATABASE, SYNC_DATABASE } from "./constants/events";
import { Article, Log, Feed } from "./database/index";
import {
  parseFeed,
  updateFeeds,
  bulkParseFeeds,
  checkIfFeedExists
} from "./util/parsers";
import { dumpFeedUrls } from "./util/dumpers";
import parser from "rss-parser";
let Parser = new parser();
var cors = require("cors");

require("./util/cronjobs");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 3000;

global.task_queue = [];

app.get("/", (req, res) => {
  res.send("Service Online");
});

app.get("/logs", async (req, res) => {
  try {
    let logs = await Log.findAll({});
    res.send(logs).status(200);
  } catch (e) {
    res.send("error").status(500);
  }
});

app.post("/feed", async (req, res) => {
  let feedExists = await checkIfFeedExists(req.body.url);
  if (!feedExists) parseFeed(req.body.url);
  feedExists
    ? res.send("Feed already exists").status(422)
    : res.send("Adding Feeed").status(400);
});

app.post("/feed-bulk", (req, res) => {
  let urls = [...new Set(req.body.url)];
  bulkParseFeeds(urls);
  res.send("Processing");
});

app.get("/feed", async (req, res) => {
  let feeds = await Feed.findAll({});
  res.send(feeds).status(200);
});

app.get("/cleardb", (req, res) => {
  Article.destroy({ where: {} });
  Feed.destroy({ where: {} });
  res.send("done");
});

app.get("/articlecount", async (req, res) => {
  let articles = await Article.findAll({});
  res.send(String(articles.length)).status(200);
});

app.get("/articles", async (req, res) => {
  let articles = await Article.findAll({
    limit: 100,
    order: [["createdAt", "DESC"]]
  });
  res.send(articles).status(200);
});

app.get("/update", async (req, res) => {
  updateFeeds();
  res.send("feed Update triggered");
});

app.post("/test", async (req, res) => {
  try {
    let feed = await Parser.parseURL(req.body.url);
    res.send(feed);
  } catch (e) {
    res.send(e);
  }
});

app.listen(port, () => {
  databaseEmitter.emit(INITIALIZE_DATABASE);
  databaseEmitter.emit(SYNC_DATABASE);
});
