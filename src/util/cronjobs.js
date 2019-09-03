const cron = require("node-cron");
const { dumpFeedUrls, dumpArticles } = require("./dumpers");
const { bulkUpdatePipeline } = require("./parsePipelines");

let isRunning = false;

let cronJobsList = [
  {
    name: "Updater Cron",
    schedule: "0 */10 * * * *",
    func: () => bulkUpdatePipeline(),
    instance:null,
    id:1
  },
  {
    name: "Dumper Cron",
    schedule: "* * 0 * * *",
    func: () => {
      dumpFeedUrls();
      dumpArticles();
    },
    instance:null,
    id:2
  },
  {
    name: "Test",
    schedule: "* * * * * *",
    func: () => {
      console.log("test")
    },
    instance:null,
    id:3
  },
];

const startJobs = () => {
  if (!isRunning) {
    cronJobsList.forEach(job => {
      job.instance = cron.schedule(job.schedule,job.func);
    })
    isRunning = true;
  }
};

const stopJobs = () => {
  if (isRunning) {
    cronJobsList.forEach(job => {
      job.instance.destroy();
    })
    isRunning = false;
  }
};

const areCronsRunning = () => {
  return isRunning;
};

const getCronData = () => {
  let data = [];
  cronJobsList.forEach(job=>{
    let temp = Object.assign({},job);
    delete temp.func;
    delete temp.instance
    data.push(temp)
  })
  return data;
}

module.exports = {
  startJobs,
  stopJobs,
  areCronsRunning,
  getCronData
};
