import { parseFeedIfNotInDb } from "./parsers";
import { processFeed } from "./parsers";
import { processFeedArticles } from "./parsers";
import { getAllFeedUrls } from "./parsers";
import { parseFeedIfInDb } from "./parsers";

export const parsePipelineIfNotInDb = async feedurl => {
  let part1 = await parseFeedIfNotInDb(feedurl);
  if (part1.feed) {
    let part2 = await processFeed(part1.feed, part1.feedUrl);
    if (part2.feedId) {
      await processFeedArticles(part2.articles, part2.feedId);
    }
  }
};

export const parsePipelineIfInDb = async feedurl => {
  let part1 = await parseFeedIfInDb(feedurl);
  if (part1.feed) {
    let part2 = await processFeed(part1.feed, part1.feedUrl);
    if (part2.feedId) {
      await processFeedArticles(part2.articles, part2.feedId);
    }
  }
};

export const bulkparsePipelineIfNotInDb = async feedArray => {
  for (let url of feedArray) {
    await parsePipelineIfNotInDb(url);
  }
};

export const bulkUpdatePipeline = async () => {
  let feedurls = await getAllFeedUrls();
  for (let url of feedurls) {
    await parsePipelineIfInDb(url);
  }
};
