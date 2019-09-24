import Sequelize from "sequelize";
import { databaseEmitter } from "../emitters/index";
import { INITIALIZE_DATABASE, SYNC_DATABASE } from "../constants/events";
import mysql2 from "mysql2";
import ArticleModel from "../models/article";
import FeedModel from "../models/feed";
import LogModel from "../models/log";

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

export const Article = ArticleModel(sequelize, Sequelize);
export const Feed = FeedModel(sequelize, Sequelize);
export const Log = LogModel(sequelize, Sequelize);
// Feed.hasMany(Article);
Article.belongsTo(Feed);
