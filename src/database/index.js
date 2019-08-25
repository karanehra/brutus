import Sequelize from "sequelize";
import { databaseEmitter } from "../emitters/index";
import { INITIALIZE_DATABASE, SYNC_DATABASE } from "../constants/events";
import mysql2 from "mysql2";
import Logger from "../util/logger";

// const sequelize = new Sequelize('newdb', 'karan', 'karan', {
//   dialect: 'mysql',
//   dialectModule: mysql2,
//   host: '35.202.76.46'
// });

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

const logger = new Logger();

databaseEmitter.on(INITIALIZE_DATABASE, () => {
  sequelize
    .authenticate()
    .then(() => {
      logger.success("Connected To Database Instance");
    })
    .catch(err => {
      logger.error("Databse Connection Failed", JSON.stringify(err));
    });
});

databaseEmitter.on(SYNC_DATABASE, () => {
  sequelize.sync().then(() => {
    logger.success("Databse Sync Success");
  });
});

import ArticleModel from "../models/article";
import FeedModel from "../models/feed";
import LogModel from "../models/log";
import { Logger } from "mongodb";
import Logger from "../util/logger";

export const Article = ArticleModel(sequelize, Sequelize);
export const Feed = FeedModel(sequelize, Sequelize);
export const Log = LogModel(sequelize, Sequelize);
Feed.hasMany(Article);
