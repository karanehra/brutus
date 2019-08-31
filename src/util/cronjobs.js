const cron = require("node-cron");
const { dumpFeedUrls, dumpArticles } = require("./dumpers");
const { bulkUpdatePipeline } = require("./parsePipelines");

cron.schedule("0 */10 * * * *", () => {
  bulkUpdatePipeline();
});

cron.schedule("* * 0 * * *", () => {
  dumpFeedUrls();
  dumpArticles();
});
