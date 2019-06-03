import Worker from "../interfaces/worker.interface";
import * as Parser from "rss-parser";
import { Feed, Article } from "./schema";
import Logger from "./logger";

export default class FeedWorker implements Worker {
  name: Readonly<string>;
  is_executing: boolean = false;
  is_finished: boolean = false;
  feed_url: string;
  parser = new Parser({
    customFields:{
      feed:['updated']
    }
  });
  cb_on_finish: Function;
  logger: Logger;

  constructor(name: string, url: string) {
    this.name = name;
    this.feed_url = url;
    this.logger = new Logger();
  }

  /**
   * The rss-parser function.
   */
  private parse = async () => {
    this.logger.info("Parsing feed: " + this.feed_url);
    try {
      let feed = await this.parser.parseURL(this.feed_url);

      Feed.find({
        url: feed.feedUrl
      }).exec((err, data) => {
        if (data.length == 0) {
          let feed_object = new Feed({
            name: feed.title,
            url: feed.feedUrl,
          });
          feed_object.save();
          this.logger.success("Parsed successfully: " + this.feed_url);
        } else {
          this.logger.success(
            "Parsed and added new feed successfully: " + this.feed_url
          );
        }
        this.writeArticlesToDatabase(feed.items);
      });
    } catch (e) {
      this.logger.error("Parse Error: " + this.feed_url);
      this.cb_on_finish();
    }
  };

  /**
   * Write articles from feed to the database.
   * @param items The items from the parsed feed.
   */
  private writeArticlesToDatabase = (items: any): void => {
    this.logger.info("Adding articles from: " + this.feed_url);
    items.forEach(item => {
      let article_object = new Article({
        title: item.title,
        content: item.content,
        content_snippet: item.contentSnippet,
        link: item.link
      });
      article_object.save().then(() => {
        if (items.indexOf(item) == items.length - 1) {
          this.logger.success("Articles added from: " + this.feed_url);
          this.cb_on_finish();
          this.is_executing = false;
          this.is_finished = true;
        }
      });
    });
  };

  /**
   * Starts worker exection.
   * @param cb The callback function
   */
  public execute = (cb: Function) => {
    this.is_executing = true;
    this.cb_on_finish = cb;
    this.parse();
  };
}
