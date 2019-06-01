import * as mongoose from "mongoose";
import Queue from "./interfaces/queue.interface";
import WorkerQueue from "./utils/queue";
import * as express from "express";
import * as bodyParser from "body-parser";
import router from "./routes";

const app = express();
app.use(bodyParser.json());

export default class Main {
  private is_running: boolean = false;
  private worker_queue: Queue = new WorkerQueue();

  constructor() {
  }

  setupDatabase = (): void => {
    mongoose.connect("mongodb://127.0.0.1:27017/test", {
      useNewUrlParser: true
    });
    app.listen(3000, () => {
      console.log("server started at http://localhost:3000");
    });
    app.use('/', router);
  };
}

let main = new Main();
main.setupDatabase();
