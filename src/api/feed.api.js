const router = require("express").Router();
const { bulkparsePipelineIfNotInDb } = require("../util/parsePipelines");
const { Feed } = require("../database/index");
const { getFreshUrls, additionPipeline } = require("../util/pipeline");

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

router.post("/bulk", (req, res) => {
  bulkparsePipelineIfNotInDb(req.body.url);
  res.send("Processing");
});

module.exports = router;
