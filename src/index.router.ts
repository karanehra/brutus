import { Request, Response } from "express";
import { Feed } from "./utils/schema";
import Worker from "./interfaces/worker.interface";
import FeedWorker from "./utils/feed.worker";
import * as express from "express";
import { Router } from "express-serve-static-core";
import Queue from "./interfaces/queue.interface";

export default class IndexRouter {
  private router: Router;
	main_queue: Queue;

  constructor(worker_queue: Queue) {
		this.router = express.Router();
		this.main_queue = worker_queue;
  }

  setupRoutes = () => {
    this.router.get("/", (req: Request, res: Response) => {
      res.send({
        message: "hello worlds"
      });
    });
    this.router.get("/abc", (req: Request, res: Response) => {
      res.send({
        message: "hello worlds"
      });
    });
    this.router.post("/add_feeds", (req: Request, res: Response) => {
      req.body.urls.forEach(url => {
        let feed_worker: Worker = new FeedWorker("worker", url);
        this.main_queue.add_worker(feed_worker);
      });
      res.send({
        message: "hello"
      });
    });
    this.router.get("/get_feeds", (req: Request, res: Response) => {
      Feed.find({}).exec((err, data) => {
        res.send({
          message: data
        });
      });
    });
  };

  getRouter = (): Router => {
    return this.router;
  };
}
