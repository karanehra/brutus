import { Feed } from "../models/feed";
import parser from "rss-parser";
let Parser = new parser();

/**
 *
 * @param {Array} urlArray
 */
export const getFreshUrls = async urlArray => {
  let newUrls = [];
  for (let url of urlArray) {
    let count = 0;
    console.log(count);
    if (count === 0) newUrls.push(url);
  }
  return newUrls;
};

/**
 *
 * @param {Array} urlArray
 */
export const parseUrls = async urlArray => {
  let parsedData = [];
  for (let url of urlArray) {
    try {
      let feed = await Parser.parseURL(url);
      parsedData.push({
        feed: feed,
        feedUrl: url
      });
    } catch (e) {
      console.log(e);
    }
  }
  return parsedData;
};

/**
 *
 * @param {Array} feedDataArray
 */
export const createBulkAdditionPayload = feedDataArray => {
  let payload = [];
  for (let data of feedDataArray) {
    let feed = data.feed;
    let sourceUrl = data.feedUrl;
    payload.push({
      title: sanitizeString(feed.title),
      url: sanitizeString(sourceUrl),
      image_url: sanitizeString(feed.image ? feed.image.link : ""),
      description: sanitizeString(feed.description || "")
    });
  }
  return payload;
};

export const addFeedsToDatabase = async payload => {
  try {
    let x = await Feed.bulkCreate(payload);
    console.log(x);
  } catch (e) {
    console.log(e);
  }
};

export const sanitizeString = datastring => {
  if (datastring) {
    let pattern = /(<([^>]+)>)/gi;
    return datastring.replace(pattern, "").trim();
  }
};

export const additionPipeline = async data => {
  let freshUrls = await getFreshUrls(data);
  let parsedData = await parseUrls(freshUrls);
  let pl = await createBulkAdditionPayload(parsedData);
  await addFeedsToDatabase(pl);
};
