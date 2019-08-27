import cron from "node-cron";
import { updateFeeds } from "./parsers";

cron.schedule("0 */3 * * * *", () =>{
  console.log("Running feed Update cron")
  updateFeeds();
})