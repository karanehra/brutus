import express from "express";
// import { databaseEmitter } from "./emitters/index";
// import { INITIALIZE_DATABASE, SYNC_DATABASE } from "./constants/events"
import cors from "cors";
import bodyParser from "body-parser";
import apis from "./api/index";
const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.use("/", apis);

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";

const dbName = "myproject";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  app.listen(port, () => {
    // databaseEmitter.emit(INITIALIZE_DATABASE);
    // databaseEmitter.emit(SYNC_DATABASE);
    console.log("APp up");
  });

  client.close();
});
