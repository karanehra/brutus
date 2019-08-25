// import "babel-polyfill";
import express from "express";
// import parser from "rss-parser";
// import { config } from 'dotenv';
import { databaseEmitter } from './emitters/index';
import { INITIALIZE_DATABASE, SYNC_DATABASE } from './constants/events';
import { Feed, Article } from "./database/index";

// // config();
// let rss = new parser();

// async function parseFeed(url) {
//   let feed = await rss.parseURL(url);
//   console.log(feed)

//   Feed.create({
//     title: feed.title,
//     url: feed.feedUrl,
//     image_url: feed.image.url || "",
//     description: feed.description,
//     last_updated: Date.now()
//   }).then(feed => {
//     console.log("Created Feed: ", feed.title)
//   })

//   feed.items.forEach(item => {
//     Article.create({
//       title: item.title,
//       link: item.link,
//       content: item.content,
//       snippet: item.contentSnippet,
//       pub_date: item.isoDate
//     }).then(article => {
//       console.log("Added Article: ", article.link)
//     }).catch(err => {
//       console.log(err)
//     })
//   })
// }

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  Article.findAll().then(articles => {
    res.send(articles)
  })
})

app.get("/sync",(req,res) => {
  databaseEmitter.emit(SYNC_DATABASE);
  res.send("Database Is Syncing")
})

app.listen(port, () => {
  databaseEmitter.emit(INITIALIZE_DATABASE);
  console.log("Server Up.")
})


// setTimeout(() => {
//   parseFeed("https://timesofindia.indiatimes.com/rssfeedstopstories.cms")
// }, 10000)




