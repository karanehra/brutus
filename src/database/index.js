const Sequelize = require("sequelize");
const { databaseEmitter } = require("../emitters/index");
const { INITIALIZE_DATABASE, SYNC_DATABASE } = require("../constants/events");
const mysql2 = require("mysql2");
const ArticleModel = require("../models/article");
const FeedModel = require("../models/feed");
const LogModel = require("../models/log");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    dialectModule: mysql2,
    host: process.env.DB_HOST
  }
);

databaseEmitter.on(INITIALIZE_DATABASE, () => {
  sequelize.authenticate();
});

databaseEmitter.on(SYNC_DATABASE, () => {
  sequelize.sync();
});

const Article = ArticleModel(sequelize, Sequelize);
const Feed = FeedModel(sequelize, Sequelize);
const Log = LogModel(sequelize, Sequelize);
Feed.hasMany(Article);

module.exports = {
  Article,
  Feed,
  Log
};
