import parser from "rss-parser";
import { Feed, Article } from "../database/index";

let Parser = new parser();

export const parseFeed = async feedurl => {
  let feed;
  try {
    feed = await Parser.parseURL(feedurl);
    processFeed(feed, feedurl);
  } catch (e) {
    console.log(e);
  }
};

export const updateFeeds = async () => {
  try {
    let feeds = await Feed.findAll({});
    feeds.forEach(async feed => {
      await parseFeed(feed.url);
    });
  } catch (e) {
    console.log(e);
  }
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
    processFeedArticles(feed.items, feedid);
  } catch (e) {
    console.log(e);
  }
};

const processFeedArticles = async (articles, feedid) => {
  await articles.forEach(async article => {
    let article_exists = await checkIfArticleExists(article.link);
    if (!article_exists) {
      Article.create({
        title: sanitizeString(article.title),
        link: sanitizeString(article.link),
        content: sanitizeString(article.content),
        snippet: sanitizeString(article.contentSnippet),
        feedId: feedid
      });
    }
  });
};

export const checkIfFeedExists = async url => {
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

const getFeedIdFromUrl = async url => {
  let feeds = await Feed.findAll({
    where: {
      url: url
    }
  });
  return feeds[0].id;
};

const checkIfArticleExists = async link => {
  let articles = [];
  try {
    articles = await Article.findAll({
      where: {
        link: link
      }
    });
  } catch (e) {
    articles = [];
  }

  return articles.length > 0;
};

export const sanitizeString = datastring => {
  let pattern = /(<([^>]+)>)/gi;
  return datastring.replace(pattern, "").trim();
};

export const bulkParseFeeds = feedArray => {
  feedArray.forEach(async feedurl => {
    let feedExists = await checkIfFeedExists(feedurl);
    if (!feedExists) {
      let feed;
      try {
        feed = await Parser.parseURL(feedurl);
        await processFeed(feed, feedurl);
      } catch (e) {
        console.log(e);
      }
    }
  });
};
