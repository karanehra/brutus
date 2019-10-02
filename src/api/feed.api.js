import express from "express";
import { Feed } from "../database/index";
import { getFreshUrls, additionPipeline } from "../util/pipeline";
import authenticationMiddleware from "../configs/authMiddleware";

let router = express.Router();
router.use(authenticationMiddleware);

router.post("/", async (req, res) => {
  let totalUrls = req.body.url.length;
  let freshUrls = await getFreshUrls(req.body.url);

  if (freshUrls.length === 0) {
    res.status(422).send("No new feeds found");
  } else {
    additionPipeline(freshUrls);
    res
      .status(202)
      .send("Adding " + freshUrls.length + " of " + totalUrls + " provided");
  }
});

router.get("/", async (req, res) => {
  let feeds = await Feed.findAll({});
  res.status(200).send(feeds);
});

export default router;
