const { parseFeedIfNotInDb } = require("./parsers");
const { processFeed } = require("./parsers");
const { processFeedArticles } = require("./parsers");
const { getAllFeedUrls } = require("./parsers");
const { parseFeedIfInDb } = require("./parsers");

const parsePipelineIfNotInDb = async feedurl => {
  let part1 = await parseFeedIfNotInDb(feedurl);
  if (part1.feed) {
    let part2 = await processFeed(part1.feed, part1.feedUrl);
    if (part2.feedId) {
      await processFeedArticles(part2.articles, part2.feedId);
    }
  }
};

const parsePipelineIfInDb = async feedurl => {
  let part1 = await parseFeedIfInDb(feedurl);
  if (part1.feed) {
    let part2 = await processFeed(part1.feed, part1.feedUrl);
    if (part2.feedId) {
      await processFeedArticles(part2.articles, part2.feedId);
    }
  }
};

const bulkparsePipelineIfNotInDb = async feedArray => {
  for (let url of feedArray) {
    await parsePipelineIfNotInDb(url);
  }
};

const bulkUpdatePipeline = async () => {
  let feedurls = await getAllFeedUrls();
  for (let url of feedurls) {
    await parsePipelineIfInDb(url);
  }
};

module.exports = {
  parsePipelineIfNotInDb,
  parsePipelineIfInDb,
  bulkparsePipelineIfNotInDb,
  bulkUpdatePipeline
};
