import "babel-polyfill";
import express from "express";
import { databaseEmitter } from "./emitters/index";
import { INITIALIZE_DATABASE, SYNC_DATABASE } from "./constants/events";
import { Article, Log, Feed } from "./database/index";
import { parseFeed } from "./util/parsers";
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
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
  let feed_processed = await parseFeed(req.body.url);
  feed_processed
    ? res.send("Added").status(201)
    : res.send("not added").status(400);
});

app.get("/feed", async (req, res) => {
  let feeds = await Feed.findAll({});
  res.send(feeds).status(200);
});

app.get("/articles", async (req, res) => {
  let articles = await Article.findAll({});
  res.send(articles).status(200);
});

app.listen(port, () => {
  databaseEmitter.emit(INITIALIZE_DATABASE);
  databaseEmitter.emit(SYNC_DATABASE);
});
