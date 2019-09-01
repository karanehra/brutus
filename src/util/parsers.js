const parser = require("rss-parser");
const { Feed, Article } = require("../database/index");

let Parser = new parser();

const parseFeedIfInDb = async feedurl => {
  let feed;
  try {
    feed = await Parser.parseURL(feedurl);
    return {
      feed: feed,
      feedUrl: feedurl
    };
  } catch (e) {
    return {};
  }
};

const parseFeedIfNotInDb = async feedurl => {
  let isFeedInDb = await checkIfFeedExists(feedurl);
  if (!isFeedInDb) {
    let data = await parseFeedIfInDb(feedurl);
    return data;
  } else {
    return {};
  }
};

const checkIfFeedExists = async url => {
  let feeds = [];
  try {
    feeds = await Feed.findAll({
      where: {
        url: url
      }
    });
  } catch (e) {
    feeds = [];
  }
  return feeds.length > 0;
};

const sanitizeString = datastring => {
  let pattern = /(<([^>]+)>)/gi;
  return datastring.replace(pattern, "").trim();
};

const processFeed = async (feed, sourceUrl) => {
  try {
    let created_feed = await Feed.create({
      title: sanitizeString(feed.title),
      url: sanitizeString(sourceUrl),
      image_url: sanitizeString(feed.image.link),
      description: sanitizeString(feed.description)
    });
    let feedid = created_feed.id;
    console.log("hello test ", feedid);
    return {
      feedId: feedid,
      articles: feed.items
    };
  } catch (e) {
    console.log(e);
    let existingFeed = await Feed.findOne({
      where: {
        url: sourceUrl
      }
    });
    return {
      feedId: existingFeed.id,
      articles: feed.items
    };
  }
};

const processFeedArticles = async (articles, feedid) => {
  articles.forEach(async article => {
    try {
      await Article.create({
        title: sanitizeString(article.title),
        link: sanitizeString(article.link),
        content: sanitizeString(article.content),
        snippet: sanitizeString(article.contentSnippet),
        feedId: feedid
      });
    } catch (e) {
      console.log(e);
    }
  });
};

const getAllFeedUrls = async () => {
  let feeds = await Feed.findAll({});
  let urls = [];
  feeds.forEach(feed => {
    urls.push(feed.url);
  });
  return urls;
};

module.exports = {
  parseFeedIfInDb,
  parseFeedIfNotInDb,
  checkIfFeedExists,
  sanitizeString,
  processFeed,
  processFeedArticles,
  getAllFeedUrls
};
