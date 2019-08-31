import cron from "node-cron";
import { dumpFeedUrls, dumpArticles } from "./dumpers";
import { bulkUpdatePipeline } from "./parsePipelines";

cron.schedule("0 */10 * * * *", () => {
  bulkUpdatePipeline();
});

cron.schedule("* * 0 * * *", () => {
  dumpFeedUrls();
  dumpArticles();
});
