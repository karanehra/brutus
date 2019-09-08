const express = require("express");
const { databaseEmitter } = require("./emitters/index");
const { INITIALIZE_DATABASE, SYNC_DATABASE } = require("./constants/events");
const cors = require("cors");
const bodyParser = require("body-parser");
const apis = require("./api/index");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.use("/", apis);

app.listen(port, () => {
  databaseEmitter.emit(INITIALIZE_DATABASE);
  databaseEmitter.emit(SYNC_DATABASE);
});
