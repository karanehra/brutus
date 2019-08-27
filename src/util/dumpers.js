import fs from "fs";
import { Feed } from "../database";
import path from "path";

export const dumpFeedUrls = async () => {
  try {
    let feeds = await Feed.findAll({});
    let dump = [];
    feeds.forEach(feed => {
      dump.push(feed.url);
    });
    fs.writeFile(
      "dumps/feeds.txt",
      JSON.stringify(dump),
      err => {
        if (!err) {
          console.log("file written");
        } else {
          console.log(err)
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
};
