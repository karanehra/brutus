import "babel-polyfill";
import express from "express";
import { databaseEmitter } from './emitters/index';
import { INITIALIZE_DATABASE, SYNC_DATABASE } from './constants/events';
import { Article, Log } from "./database/index";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  Article.findAll().then(articles => {
    res.send(articles)
  })
})

app.get("/logs", (req, res) => {
  Log.findAll().then(logs => {
    res.send(logs)
  })
})

app.listen(port, () => {
  databaseEmitter.emit(INITIALIZE_DATABASE);
  databaseEmitter.emit(SYNC_DATABASE);
});