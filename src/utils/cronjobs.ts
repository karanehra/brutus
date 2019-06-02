import Queue from "../interfaces/queue.interface";
import * as nodecron from "node-cron";

export default class CronJobs {
  worker_queue: Queue;
  cron: any;
  constructor(worker_queue: Queue) {
    this.worker_queue = worker_queue;
    this.cron = nodecron;
  }

  setupJobs = () => {
    this.cron.schedule("10 * * * * *", function() {
      console.log("running a task every minute");
    });
    
  };
}
