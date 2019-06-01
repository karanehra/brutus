import Worker from "../interfaces/worker.interface";
import * as Parser from "rss-parser";
import { Feed, Article } from "./schema";

export default class FeedWorker implements Worker {
  name: Readonly<string>;
  is_executing: boolean = false;
  is_finished: boolean = false;
  feed_url: string;
  parser = new Parser();
  cb_on_finish: Function;

  constructor(name: string, url: string) {
    this.name = name;
    this.feed_url = url;
  }

  private parse = async () => {
    console.log(this.feed_url);

    let feed = await this.parser.parseURL(this.feed_url);
    let feed_object = new Feed({
      name: feed.title,
      url: feed.feedUrl
    });
    feed_object.save();

    feed.items.forEach(item => {
      let article_object = new Article({
        title: item.title,
        content: item.content,
        content_snippet: item.contentSnippet,
        link: item.link
      });
      article_object.save().then(() => {
        if (feed.items.indexOf(feed) == feed.items.length + 1) {
          console.log("added");
          this.cb_on_finish();
          this.is_executing = false;
          this.is_finished = true;
        }
      });
    });
  };

  public execute = (cb: Function) => {
    this.is_executing = true;
    this.cb_on_finish = cb;
    this.parse();
  };
}
