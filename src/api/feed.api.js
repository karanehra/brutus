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
    res.send("No new feeds found").status(422);
  } else {
    additionPipeline(freshUrls);
    res
      .send("Adding " + freshUrls.length + " of " + totalUrls + " provided")
      .status(200);
  }
});

router.get("/", async (req, res) => {
  let feeds = await Feed.findAll({});
  res.send(feeds).status(200);
});

export default router;
