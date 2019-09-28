import express from "express"
import { databaseEmitter } from "./emitters/index";
import { INITIALIZE_DATABASE, SYNC_DATABASE } from "./constants/events"
import cors from "cors"
import bodyParser from "body-parser"
import apis from "./api/index"
const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3001;

app.use("/", apis);

app.listen(port, () => {
  databaseEmitter.emit(INITIALIZE_DATABASE);
  databaseEmitter.emit(SYNC_DATABASE);
  console.log("db up")
});
