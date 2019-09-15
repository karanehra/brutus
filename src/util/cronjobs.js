const cron = require("node-cron");
const { dumpFeedUrls, dumpArticles } = require("./dumpers");
const { bulkUpdatePipeline } = require("./parsePipelines");
const Logger = require("../util/logger");

const logger = new Logger();

let cronJobsList = [
  {
    name: "Updater Cron",
    schedule: "0 */10 * * * *",
    func: () => bulkUpdatePipeline(),
    instance: null,
    isRunning: false,
    id: 1
  },
  {
    name: "Dumper Cron",
    schedule: "* * 0 * * *",
    func: () => {
      dumpFeedUrls();
      dumpArticles();
    },
    instance: null,
    isRunning: false,
    id: 2
  },
  {
    name: "Test",
    schedule: "* * * * * *",
    func: () => {
      console.log("test");
    },
    instance: null,
    isRunning: false,
    id: 3
  }
];

const startJob = id => {
  let job = cronJobsList.filter(job => job.id == id)[0];
  if (!job.isRunning) {
    job.instance = cron.schedule(job.schedule, job.func);
    job.isRunning = true;
    logger.success("Cron " + job.name + " started.");
  } else {
    logger.error("Cron " + job.name + " is already running.");
  }
};

const stopJob = id => {
  let job = cronJobsList.filter(job => job.id == id)[0];
  if (job.isRunning) {
    job.instance.destroy();
    job.isRunning = false;
    logger.success("Cron " + job.name + " stopped.");
  } else {
    logger.error("Cron " + job.name + " is already stopped.");
  }
};

const getCronData = () => {
  let data = [];
  cronJobsList.forEach(job => {
    let temp = Object.assign({}, job);
    delete temp.func;
    delete temp.instance;
    data.push(temp);
  });
  return data;
};

module.exports = {
  getCronData,
  startJob,
  stopJob
};
