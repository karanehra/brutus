import Worker from "./worker.interface";
import * as Parser from "rss-parser";
import { Feed } from "./schema";


export default class FeedWorker implements Worker {
  name: Readonly<string>;
  is_executing: boolean = false;
  is_finished: boolean = false;
  feed_url: string;
  parser = new Parser();

  constructor(name: string, url: string) {
    this.name = name;
    this.feed_url = url;
  }

  parse = async () => {
      console.log(this.feed_url);
    
    let feed = await this.parser.parseURL(this.feed_url);
    console.log(feed);
    let feed_object = new Feed({
      name: feed.title,
      url: feed.feedUrl,
    });
    feed_object.save().then(() => {
        console.log("added")
        this.is_executing = false;
        this.is_finished = true;
    })
  };

  execute = () => {
    console.log("worker executing")
    this.is_executing = true;
    this.parse();
  };
}
