import Feed from "../models/feed";
import parser from "rss-parser";
import { sanitizeString } from "./pipeline";
import Article from '../models/article';

export default class BrutusParser {
  urlArray = [];
  freshUrls = [];
  mode = "";
  rssParser = new parser();
  parsedFeedData = [];
  bulkFeedAdditionPayload = [];
  bulkArticelAdditionPayload = [];

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
      await this.createBulkArticleAdditionPayload();
      await this.bulkWriteArticlesToDatabase();
    } else {
      await this.parseUrls();
      await this.createBulkArticleAdditionPayload();
      await this.bulkWriteArticlesToDatabase();
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

  async createBulkArticleAdditionPayload() {
    let payload = [];
    for (let feed of this.parsedFeedData) {
      let feedInstance = await Feed.findOne().where({
        url: feed.feedUrl
      });
      feed.feed.items.forEach(data => {
        payload.push({
          title: sanitizeString(data.title),
          link: sanitizeString(data.link),
          content: sanitizeString(data.content),
          snippet: sanitizeString(data.contentSnippet) || "",
          feedId: feedInstance._id
        });
      });
    }
    this.bulkArticelAdditionPayload = payload;
  }

  async bulkWriteFeedsToDatabase() {
    try {
      let a = await Feed.insertMany(this.bulkFeedAdditionPayload);
      console.log(a);
    } catch (e) {
      console.log(e);
    }
  }

  async bulkWriteArticlesToDatabase() {
    try {
      let a = await Article.insertMany(this.bulkArticelAdditionPayload);
      console.log(a);
    } catch (e) {
      console.log(e);
    }
  }
}
