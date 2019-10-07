import Feed from "../models/feed";
import parser from "rss-parser";
import { sanitizeString } from "./pipeline";

export default class BrutusParser {
  urlArray = [];
  freshUrls = [];
  mode = "";
  rssParser = new parser();
  parsedFeedData = [];
  bulkFeedAdditionPayload = [];

  /**
   * @param {Array<String>} urlArray An Array of RSS feed urls
   * @param {String} mode Parser mode.
   *  Use "fresh" to add new Feeds & "update" for running an update for exisitng feeds
   */
  constructor(urlArray, mode) {
    this.urlArray = urlArray;
    this.mode = mode;
  }

  async getFreshUrls() {
    let newUrls = [];
    for (let url of this.urlArray) {
      let count = await Feed.countDocuments({ url });
      if (count === 0) newUrls.push(url);
    }
    this.freshUrls = newUrls;
  }

  async parseUrls() {
    let parsedData = [];
    let urls = null;
    if (this.mode === "fresh") {
      urls = this.freshUrls;
    } else {
      urls = this.urlArray;
    }
    for (let url of urls) {
      try {
        let feed = await this.rssParser.parseURL(url);
        parsedData.push({
          feed: feed,
          feedUrl: url
        });
      } catch (e) {
        console.log(e);
      }
    }
    this.parsedFeedData = parsedData;
  }

  async startPipeline() {
    if (this.mode === "fresh") {
      await this.getFreshUrls();
      await this.parseUrls();
      this.createBulkFeedAdditionPayload();
      await this.bulkWriteFeedsToDatabase();
      this.createBulkArticleAdditionPayload();
    } else {
      await this.parseUrls();
      this.createBulkArticleAdditionPayload();
    }
  }

  createBulkFeedAdditionPayload() {
    let payload = [];
    this.parsedFeedData.forEach(feed => {
      payload.push({
        title: sanitizeString(feed.feed.title),
        url: feed.feedUrl,
        description: sanitizeString(feed.feed.description)
      });
    });
    this.bulkFeedAdditionPayload = payload;
  }

  createBulkArticleAdditionPayload() {
    // let payload = [];
    this.parsedFeedData.forEach(feed => {
      console.log(feed.feed.items);
    });
    // this.bulkFeedAdditionPayload = payload;
  }

  async bulkWriteFeedsToDatabase() {
    try {
      let a = await Feed.insertMany(this.bulkFeedAdditionPayload);
      console.log(a);
    } catch (e) {
      console.log(e);
    }
  }
}
