import express from "express";
import {
  toiScraper,
  techRepublicScraper,
  indiaTimesScraper
} from "../util/scrapers";
import authenticationMiddleware from "../configs/authMiddleware";
import Article from "../models/article";

let router = express.Router();
// router.use(authenticationMiddleware);

router.get("/", async (req, res) => {
  try {
    let articles = await Article.find().limit(100);
    res.status(200).send({
      data: articles
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/parse", async (req, res) => {
  let url = req.body.url;
  let pattern = /timesofindia.indiatimes.com/;
  let pattern2 = /www.techrepublic.com/;
  let pattern3 = /www.indiatoday.in/;

  if (String(url).match(pattern)) {
    toiScraper(url, res);
  } else if (String(url).match(pattern2)) {
    techRepublicScraper(url, res);
  } else if (String(url).match(pattern3)) {
    indiaTimesScraper(url, res);
  } else {
    res.send("No match Found ");
  }
});

export default router;
