const router = require("express").Router();
const { Article, Feed } = require("../database/index");
const axios = require("axios");
const cheerio = require("cheerio");

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
  if (String(url).match(pattern)) {
    let newpat = /[\d\w]*(\.cms)/g;
    let id = String(url).match(newpat);
    let val = await cache.get("/timesofindia.indiatimes.com/" + id);
    if (val) {
      res.send(val);
    } else {
      let newurl = "http://timesofindia.indiatimes.com/articleshowprint/" + id;
      axios
        .get(newurl)
        .then(resp => {
          let mkp = cheerio.load(resp.data);
          cache.set(
            "/timesofindia.indiatimes.com/" + id,
            mkp(".Normal").text()
          );
          res.send(mkp(".Normal").text());
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});

module.exports = router;
