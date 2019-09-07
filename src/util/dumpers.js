const fs = require("fs");
const { Feed } = require("../database");
const { Article } = require("../database/index");

const dumpFeedUrls = async () => {
  try {
    let feeds = await Feed.findAll({});
    let dump = [];
    feeds.forEach(feed => {
      dump.push(feed.url);
    });
    fs.writeFile(
      "dumps/feeds-" + Date.now().toString() + ".txt",
      JSON.stringify(dump),
      err => {
        if (!err) {
          console.log("file written");
        } else {
          console.log(err);
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
};

const dumpArticles = async () => {
  try {
    let articles = await Article.findAll({});
    let filename = "dumps/articles-" + Date.now().toString() + ".txt";
    fs.writeFile(filename, JSON.stringify(articles), err => {
      if (!err) {
        console.log("file written");
      } else {
        console.log(err);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { dumpFeedUrls, dumpArticles };
