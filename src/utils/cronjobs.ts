import Queue from "../interfaces/queue.interface";
import * as nodecron from "node-cron";
import { Feed } from "./schema";
import FeedWorker from "./feed.worker";
import Worker from "../interfaces/worker.interface";
import FeedType from "../interfaces/feed.interface";
import Logger from "./logger";

export default class CronJobs {
  worker_queue: Queue;
  cron: any;
  logger: Logger;

  constructor(worker_queue: Queue) {
    this.worker_queue = worker_queue;
    this.cron = nodecron;
    this.logger = new Logger();
  }

  setupJobs = (): void => {
    this.cron.schedule("* * * * *", () => this.updateFeeds());
  };

  updateFeeds = (): void => {
    this.logger.info("Running cron Job: FeedUpdate");
    Feed.find({}).exec((err, data) => {
      if (data.length) {
        data.forEach((feed_item: any) => {
          console.log("item",feed_item)
          console.log(feed_item.url)
          let feed_worker: Worker = new FeedWorker("worker", feed_item.url);
          this.worker_queue.add_worker(feed_worker);
        });
      }
    });
  };
}
