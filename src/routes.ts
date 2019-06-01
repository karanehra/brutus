import { Request, Response } from "express";
import { Feed } from "./utils/schema";
import Worker from "./interfaces/worker.interface";
import FeedWorker from "./utils/feed.worker";
var express = require("express");
var router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send({
    message: "hello worlds"
  });
});
router.get("/abc", (req: Request, res: Response) => {
  res.send({
    message: "hello worlds"
  });
});
router.post("/add_feeds", (req: Request, res: Response) => {
  req.body.urls.forEach(url => {
    let feed_worker: Worker = new FeedWorker("worker", url);
    this.worker_queue.add_worker(feed_worker);
  });
  res.send({
    message: "hello"
  });
});
router.get("/get_feeds", (req: Request, res: Response) => {
  Feed.find({}).exec((err, data) => {
    res.send({
      message: data
    });
  });
});

export default router