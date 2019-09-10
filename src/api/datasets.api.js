const router = require("express").Router();
const { Article, Feed } = require("../database/index");
const cache = require("../redis");
const { ARTICLE_DATAPOINTS } = require("../constants/cacheKeys");

router.get("/dataset", async (req, res) => {
  let val = await cache.get(ARTICLE_DATAPOINTS);
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
    let dataset2 = {};
    let cumulative = 0;
    Object.keys(dataset).forEach(key => {
      cumulative = cumulative + dataset[key];
      dataset2[key] = cumulative;
    });
    let finalSet = {
      addedDaily: dataset,
      dailyCount: dataset2
    }
    cache.set(ARTICLE_DATAPOINTS, JSON.stringify(finalSet), "EX", 86400);
    res.send(finalSet);
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
