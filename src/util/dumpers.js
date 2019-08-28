import fs from "fs";
import { Feed } from "../database";
import { Article } from '../database/index';

export const dumpFeedUrls = async () => {
  try {
    let feeds = await Feed.findAll({});
    let dump = [];
    feeds.forEach(feed => {
      dump.push(feed.url);
    });
    fs.writeFile(
      "dumps/feeds-"+Date.now().toString()+".txt",
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

export const dumpArticles = async () =>{
  try{
    let articles = await Article.findAll({});
    fs.writeFile(
      "dumps/articles-"+Date.now().toString()+".txt",
      JSON.stringify(articles),
      err => {
        if (!err) {
          console.log("file written");
        } else {
          console.log(err)
        }
      }
    );
  } catch(e){
    console.log(e)
  }
}