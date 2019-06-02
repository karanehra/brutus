import * as mongoose from "mongoose";
import Queue from "./interfaces/queue.interface";
import WorkerQueue from "./utils/queue";
import * as express from "express";
import * as bodyParser from "body-parser";
import IndexRouter from "./index.router";
import CronJobs from "./utils/cronjobs";

const app = express();
app.use(bodyParser.json());

export default class Main {
  private is_running: boolean = false;
  private worker_queue: Queue = new WorkerQueue();
  private cronjobs: CronJobs = new CronJobs(this.worker_queue);

  constructor() {
  }
  /**
   * Setup mongo connection via mongoose.
   */
  setupDatabase = (): void => {
    mongoose.connect("mongodb://127.0.0.1:27017/test", {
      useNewUrlParser: true
    });
  };

  /**
   * Setup express and the server.
   */
  setupRouting = (): void => {
    app.listen(3000, () => {
      console.log("server started at http://localhost:3000");
    });
    let router = new IndexRouter(this.worker_queue);
    router.setupRoutes();
    app.use('/', router.getRouter());
    this.cronjobs.setupJobs();
  }
}

let main = new Main();
main.setupDatabase();
main.setupRouting();
