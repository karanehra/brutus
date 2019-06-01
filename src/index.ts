import * as express from "express";
import { Request, Response } from "express";
import bodyParser = require("body-parser");
import FeedWorker from "./feed.worker";
import * as mongoose from "mongoose";
import { Feed } from "./schema";
import Worker from "./worker.interface";
import { worker } from "cluster";

const Parser = require("rss-parser");
const parser = new Parser();

interface MainStatus {
  worker_queue: Worker[]
}

export default class Main {
  is_running: boolean = false;
  task_ids: string[] = [];
  worker_queue: Worker[] = [];
  app = express();


  PORT = 3000;

  constructor() {
    this.app.use(bodyParser.json());
  }

  runMainLoop = (): void => {
    this.is_running = true;
    this.worker_queue.forEach(worker => {
      worker.execute();

    })
    // while (this.is_running) {
    //   this.worker_queue.forEach(worker => {
    //     if (worker.is_executing) {
    //     } else {
    //       worker.execute();
    //       // if(worker.is_finished){
    //       //   this.worker_queue.splice(this.worker_queue.indexOf(worker),1);
    //       if (this.worker_queue.length == 0) {
    //         this.is_running = false;
    //         console.log("tasks done");
    //       }
    //       // } else {
    //       //   worker.execute();
    //       // }
    //     }
    //   });
    // }
  };

  addWorker = (worker: Worker): void => {
    this.worker_queue.push(worker);
    console.log(
      "Worker queue has " +
        this.worker_queue.length +
        " items. Waiting for execution"
    );
    if(!this.is_running){
      this.runMainLoop();
    }
  };

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
    this.app.post("/add_feed", (req: Request, res: Response) => {
      let feed_worker: Worker = new FeedWorker("worker", req.body.url);
      this.addWorker(feed_worker);
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
    this.app.get("/start_execution", (req: Request, res: Response) => {
      if (this.worker_queue.length == 0) {
        res.send({
          message: "No workers in queue"
        });
      } else {
        this.runMainLoop();
        res.send({
          message: "Execution started"
        });
      }
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
