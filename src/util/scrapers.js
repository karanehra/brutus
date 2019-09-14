const cache = require("../redis");
const axios = require("axios");
const cheerio = require("cheerio");

const toiScraper = async (url, res) => {
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
        cache.set("/timesofindia.indiatimes.com/" + id, mkp(".Normal").text());
        res.send(mkp(".Normal").text());
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const techRepublicScraper = async (url, res) => {
  let val = await cache.get(url);
  if (val) {
    res.send(val);
  } else {
    axios
      .get(url)
      .then(resp => {
        let mkp = cheerio.load(resp.data);

        res.send(cheerio.text(mkp("p")));
      })
      .catch(err => {
        console.log(err);
      });
  }
};

module.exports = { toiScraper, techRepublicScraper };
