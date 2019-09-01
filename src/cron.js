const express = require("express");
const { databaseEmitter } = require("./emitters/index");
const { INITIALIZE_DATABASE, SYNC_DATABASE } = require("./constants/events");
const cors = require("cors");
const bodyParser = require("body-parser");

require("./util/cronjobs");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3001;

app.get("/", (req, res) => {
  res.send("cron runner");
});
app.listen(port, () => {
  databaseEmitter.emit(INITIALIZE_DATABASE);
  databaseEmitter.emit(SYNC_DATABASE);
});