import express from "express";
import { Article, Feed } from "../database/index";
import {
  toiScraper,
  techRepublicScraper,
  indiaTimesScraper
} from "../util/scrapers";
import authenticationMiddleware from "../configs/authMiddleware";

let router = express.Router();
router.use(authenticationMiddleware);

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
