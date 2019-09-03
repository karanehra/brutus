const cron = require("node-cron");
const { dumpFeedUrls, dumpArticles } = require("./dumpers");
const { bulkUpdatePipeline } = require("./parsePipelines");

let updateJob, dumpJob, testCron;
let isRunning = false;

const startJobs = () => {
  if (!isRunning) {
    updateJob = cron.schedule("0 */10 * * * *", () => {
      bulkUpdatePipeline();
    });
    dumpJob = cron.schedule("* * 0 * * *", () => {
      dumpFeedUrls();
      dumpArticles();
    });
    testCron = cron.schedule("* * * * * *", () => {
      console.log("test")
    })
    isRunning = true;
  }
};

const stopJobs = () => {
  if (isRunning) {
    updateJob.destroy();
    dumpJob.destroy();
    testCron.destroy();
    isRunning = false;
  }
};

const areCronsRunning = () => {
  return isRunning;
};

module.exports = {
  startJobs, stopJobs, areCronsRunning
}