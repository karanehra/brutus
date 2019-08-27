import parser from "rss-parser";
import { Feed } from "../database";
import { Article } from "../database/index";

let Parser = new parser();

export const parseFeed = async feedurl => {
  let feed;
  try {
    feed = await Parser.parseURL(feedurl);
    processFeed(feed);
    return true;
  } catch (e) {
    return false;
  }
};

export const updateFeeds = async () =>{
  try{
    let feeds = await Feed.findAll({});
    feeds.forEach(async feed =>{
      await parseFeed(feed.url)
    })
  } catch(e){
    console.log(e)
  }
}

const processFeed = async feed => {
  let is_processed = await checkIfFeedExists(feed.feedUrl);
  if (!is_processed) {
    try {
      let created_feed = await Feed.create({
        title: feed.title,
        url: feed.feedUrl,
        image_url: feed.image.link,
        description: feed.description
      });
    } catch (e) {
      console.log(e);
    }
  }
  processFeedArticles(feed.items);
};

const processFeedArticles = async articles => {
  await articles.forEach(async article => {
    let article_exists = await checkIfArticleExists(article.link);
    if (!article_exists) {
      Article.create({
        title: article.title,
        link: article.link,
        content: article.content,
        snippet: article.contentSnippet
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
