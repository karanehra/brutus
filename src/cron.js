const express = require("express");
const { databaseEmitter } = require("./emitters/index");
const { INITIALIZE_DATABASE, SYNC_DATABASE } = require("./constants/events");
const cors = require("cors");
const bodyParser = require("body-parser");
const { startJob, stopJob, getCronData } = require("./util/cronjobs");
require("./util/cronjobs");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3001;

app.get("/", (req, res) => {
  res.send(getCronData());
});

app.get("/stop/:id", (req,res)=> {
  stopJob(req.params.id)
  res.sendStatus(200)
})
app.get("/start/:id", (req,res)=> {
  startJob(req.params.id)
  res.sendStatus(200)
})

app.listen(port, () => {
  databaseEmitter.emit(INITIALIZE_DATABASE);
  databaseEmitter.emit(SYNC_DATABASE);
});
