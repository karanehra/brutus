const router = require("express").Router();
const { Article, Feed } = require("../database/index");
const { toiScraper, techRepublicScraper } = require("../util/scrapers");

router.get("/", async (req, res) => {
  let articles = await Article.findAll({
    limit: 100,
    order: [["createdAt", "DESC"]],
    include: [Feed]
  });
  res.send(articles).status(200);
});

router.post("/parse", async (req, res) => {
  let url = req.body.url;
  let pattern = /timesofindia.indiatimes.com/;
  let pattern2 = /www.techrepublic.com/;
  if (String(url).match(pattern)) {
    toiScraper(url, res);
  } else if (String(url).match(pattern2)) {
    techRepublicScraper(url, res);
  } else {
    res.send("No match Found");
  }
});

module.exports = router;
