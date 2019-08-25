import "babel-polyfill";
import express from "express";
import { databaseEmitter } from './emitters/index';
import { INITIALIZE_DATABASE, SYNC_DATABASE } from './constants/events';
import { Feed, Article, Log } from "./database/index";
import Logger from './util/logger';

const app = express();
const port = process.env.PORT || 3000;

const logger = new Logger();

app.get("/", (req, res) => {
  Article.findAll().then(articles => {
    res.send(articles)
  })
})

app.get("/sync", (req, res) => {
  databaseEmitter.emit(SYNC_DATABASE);
  res.send("Database Is Syncing")
})

app.get("/logs", (req, res) => {
  Log.findAll().then(logs => {
    res.send(logs)
  })
})

app.listen(port, () => {
  databaseEmitter.emit(INITIALIZE_DATABASE);
  logger.success("Server Initailized On Port ", port);
})