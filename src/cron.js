import express from "express ";
import { databaseEmitter } from "./emitters/index ";
import { INITIALIZE_DATABASE, SYNC_DATABASE } from "./constants/events ";
import cors from "cors ";
import bodyParser from "body-parser ";
import { startJob, stopJob, getCronData } from "./util/cronjobs ";
import "./util/cronjobs ";

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3001;

app.get("/", (req, res) => {
  res.send(getCronData());
});

app.get("/stop/:id", (req, res) => {
  stopJob(req.params.id);
  res.sendStatus(200);
});
app.get("/start/:id", (req, res) => {
  startJob(req.params.id);
  res.sendStatus(200);
});

app.listen(port, () => {
  databaseEmitter.emit(INITIALIZE_DATABASE);
  databaseEmitter.emit(SYNC_DATABASE);
});
