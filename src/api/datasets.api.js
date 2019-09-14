const router = require("express").Router();
const { Article, Feed } = require("../database/index");
const cache = require("../redis");
const { ARTICLE_DATAPOINTS } = require("../constants/cacheKeys");
const { getPerDayArticleData } = require("../util/datasets");

router.get("/dataset", async (req, res) => {
  let val = await cache.get(ARTICLE_DATAPOINTS);
  if (val) {
    res.send(JSON.parse(val));
  } else {
    let dataset = await getPerDayArticleData();
    let dataset2 = {};
    let cumulative = 0;
    Object.keys(dataset).forEach(key => {
      cumulative = cumulative + dataset[key];
      dataset2[key] = cumulative;
    });
    let finalSet = {
      addedDaily: dataset,
      dailyCount: dataset2
    };
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
