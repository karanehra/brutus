const router = require('express').Router();
const { checkIfFeedExists } = require("../util/parsers");
const { parseFeedIfInDb } = require("../util/parsers");
const {
  bulkparsePipelineIfNotInDb
} = require("../util/parsePipelines");
const { Feed } = require("../database/index");

router.post("/", async (req, res) => {
  let feedExists = await checkIfFeedExists(req.body.url);
  if (!feedExists) parseFeedIfInDb(req.body.url);
  feedExists
    ? res.send("Feed already exists").status(422)
    : res.send("Adding Feeed").status(400);
});
router.get("/", async (req, res) => {
  let feeds = await Feed.findAll({});
  res.send(feeds).status(200);
});
router.post("/bulk", (req, res) => {
  bulkparsePipelineIfNotInDb(req.body.url);
  res.send("Processing");
});



module.exports = router