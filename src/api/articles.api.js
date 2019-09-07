const router = require('express').Router();
const { Article } = require("../database/index");

router.get("/count", async (req, res) => {
  let articles = await Article.findAll({});
  let unique_articles = [...new Set(articles)];
  res
    .send({
      total: String(articles.length),
      unique: String(unique_articles.length)
    })
    .status(200);
});

router.get("/", async (req, res) => {
  let articles = await Article.findAll({
    limit: 100,
    order: [["createdAt", "DESC"]]
  });
  res.send(articles).status(200);
});

module.exports = router