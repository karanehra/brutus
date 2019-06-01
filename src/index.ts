import * as express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import FeedWorker from "./feed.worker";
import * as mongoose from "mongoose";
import { Feed } from "./schema";
import Worker from "./worker.interface";
import Queue from "./queue.interface";
import WorkerQueue from "./queue";


export default class Main {
  is_running: boolean = false;
  worker_queue: Queue = new WorkerQueue();
  app = express();
  PORT = 3000;

  constructor() {
    this.app.use(bodyParser.json());
  }

  setupDatabase = (): void => {
    mongoose.connect("mongodb://127.0.0.1:27017/test", {
      useNewUrlParser: true
    });
  };

  setupRoutes = (): void => {
    this.app.get("/", (req: Request, res: Response) => {
      res.send({
        message: "hello worlds"
      });
    });
    this.app.get("/abc", (req: Request, res: Response) => {
      res.send({
        message: "hello worlds"
      });
    });
    this.app.post("/add_feeds", (req: Request, res: Response) => {
      req.body.urls.forEach(url => {
        let feed_worker: Worker = new FeedWorker("worker", url);
        this.worker_queue.add_worker(feed_worker);
      })
      res.send({
        message: "hello"
      });
    });
    this.app.get("/get_feeds", (req: Request, res: Response) => {
      Feed.find({}).exec((err, data) => {
        res.send({
          message: data
        });
      });
    });
  };

  startServer = (): void => {
    if (require.main === module) {
      this.app.listen(this.PORT, () => {
        console.log("server started at http://localhost:" + this.PORT);
      });
    }
  };
}

let main = new Main();
main.setupRoutes();
main.startServer();
main.setupDatabase();
