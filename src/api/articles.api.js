const router = require("express").Router();
const { Article, Feed } = require("../database/index");
const axios = require("axios");
const cheerio = require("cheerio");
const { toiScraper } = require("../util/scrapers");
const cache = require("../redis");

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
    let val = await cache.get(url);
    if (val) {
      res.send(val);
    } else {
      axios
        .get(url)
        .then(resp => {
          let mkp = cheerio.load(resp.data);
          let string = "";
          // console.log()
          Array.from(mkp("p")).forEach(p => {
            string = string + p.innerText;
          });
          cache.set(url, string);
          res.send(string);
        })
        .catch(err => {
          console.log(err);
        });
    }
  } else {
    res.send("No match Found");
  }
});

module.exports = router;
