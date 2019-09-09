const router = require("express").Router();
const { Article, Feed } = require("../database/index");
const cache = require("../redis");

router.get("/dataset", async (req, res) => {
  let val = await cache.get("article_datapoints");
  if (val) {
    res.send(JSON.parse(val));
  } else {
    let articles = await Article.findAll({});
    let dataset = {};
    articles.forEach(article => {
      let date = new Date(article.createdAt);
      let createdDate = String(Date.parse(date.toISOString().split("T")[0]));
      if (Object.keys(dataset).includes(createdDate)) {
        console.log(Object.keys(dataset));
        dataset[createdDate] = dataset[createdDate] + 1;
      } else {
        dataset[createdDate] = 1;
      }
    });
    cache.set("article_datapoints", JSON.stringify(dataset), "EX", 86400);
    res.send(dataset);
  }
});

router.get("/", async (req, res) => {
  let val = await cache.get("appStatus");
  if (val) {
    res.send(JSON.parse(val));
  } else {
    let articleCount = await Article.count({});
    let feedCount = await Feed.count({});
    let payload = {
      articles: articleCount,
      feeds: feedCount
    };
    cache.set("appStatus", JSON.stringify(payload), "EX", 60);
    res.send(payload);
  }
});

module.exports = router;
