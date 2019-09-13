const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { Feed, Article } = require("../database/index");

router.get("/feeds", async (req, res) => {
  let feeds = await Feed.findAll({});
  let dump = [];
  feeds.forEach(feed => {
    dump.push(feed.url);
  });
  let filename = "dumps/feeds-" + Date.now().toString() + ".txt";
  fs.writeFile(filename, JSON.stringify(dump), err => {
    if (!err) {
      res.sendFile(path.join(__dirname, "../../", filename));
    } else {
      res.send("error");
    }
  });
});

router.get("/articles", async (req, res) => {
  let feeds = await Article.findAll({});
  let filename = "dumps/articles-" + Date.now().toString() + ".txt";
  fs.writeFile(filename, JSON.stringify(feeds), err => {
    if (!err) {
      res.sendFile(path.join(__dirname, "../../", filename));
    } else {
      res.send("error");
    }
  });
});

module.exports = router;
