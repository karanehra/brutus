import parser from "rss-parser";
import { Feed } from "../database";
import { Article } from "../database/index";

let Parser = new parser();

export const parseFeed = async feedurl => {
  let feed;
  try {
    feed = await Parser.parseURL(feedurl);
    processFeed(feed, feedurl);
    return true;
  } catch (e) {
    return false;
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
  let is_processed = await checkIfFeedExists(feed.feedUrl);
  let feedid;
  if (!is_processed) {
    try {
      let created_feed = await Feed.create({
        title: feed.title,
        url: feed.feedUrl || sourceUrl,
        image_url: feed.image.link,
        description: feed.description
      });
      feedid = created_feed.id;
    } catch (e) {
      console.log(e);
    }
  } else {
    feedid = await getFeedIdFromUrl(sourceUrl);
  }
  processFeedArticles(feed.items,feedid);
};

const processFeedArticles = async (articles, feedid) => {
  await articles.forEach(async article => {
    let article_exists = await checkIfArticleExists(article.link);
    if (!article_exists) {
      Article.create({
        title: article.title,
        link: article.link,
        content: article.content,
        snippet: article.contentSnippet,
        feedId: feedid
      });
    }
  });
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

  return feeds.length;
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

  return articles.length;
};
