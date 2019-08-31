const Sequelize = require("sequelize");
const { databaseEmitter } = require("../emitters/index");
const { INITIALIZE_DATABASE, SYNC_DATABASE } = require("../constants/events");
const mysql2 = require("mysql2");
const ArticleModel = require("../models/article");
const FeedModel = require("../models/feed");
const LogModel = require("../models/log");

const sequelize = new Sequelize("newdb", "karan", "karan", {
  dialect: "mysql",
  dialectModule: mysql2,
  host: process.env.CLOUD_SQL_CONNECTION_NAME
    ? `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`
    : "35.202.76.46",
  socketPath: process.env.CLOUD_SQL_CONNECTION_NAME
    ? `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`
    : undefined
});

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
