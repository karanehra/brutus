import cron from "node-cron";
import { updateFeeds } from "./parsers";
import { dumpFeedUrls, dumpArticles } from "./dumpers";

cron.schedule("0 */10 * * * *", () =>{
  updateFeeds();
})

cron.schedule("* * 0 * * *", () =>{
  dumpFeedUrls();
  dumpArticles();
})