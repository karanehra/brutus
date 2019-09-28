import { Article } from "../database/index";

export const getPerDayArticleData = async () => {
  let articles = await Article.findAll({});
  let dataset = {};
  articles.forEach(article => {
    let date = new Date(article.createdAt);
    let createdDate = String(Date.parse(date.toISOString().split("T")[0]));
    if (Object.keys(dataset).includes(createdDate)) {
      dataset[createdDate] = dataset[createdDate] + 1;
    } else {
      dataset[createdDate] = 1;
    }
  });
  return dataset;
};

export default getPerDayArticleData;
