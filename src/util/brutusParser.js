import Feed from "../models/feed";
import parser from "rss-parser";

export default class BrutusParser {
  urlArray = null;
  freshUrls = null;
  mode = null;
  rssParser = new parser();
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
      let count = await Feed.count({ url });
      if (count === 0) newUrls.push(url);
    }
    this.freshUrls = newUrls;
  }

  async parseUrls(urlArray) {
    let parsedData = [];
    for (let url of urlArray) {
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
    return parsedData;
  }
}
