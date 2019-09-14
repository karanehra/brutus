const {
  getAllFeedUrls,
  parseFeedIfInDb,
  processFeedArticles,
  processFeed,
  parseFeedIfNotInDb
} = require("./parsers");
// const cache = require("../redis");
const { LAST_BULK_UPDATE } = require("../constants/cacheKeys");

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
  // cache.set(LAST_BULK_UPDATE, Date.now());
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
