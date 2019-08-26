import Sequelize from "sequelize";
import mysql2 from "mysql2";
import ArticleModel from "../models/article";
import FeedModel from "../models/feed";
import LogModel from "../models/log";

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

export const Article = ArticleModel(sequelize, Sequelize);
export const Feed = FeedModel(sequelize, Sequelize);
export const Log = LogModel(sequelize, Sequelize);
Feed.hasMany(Article);

sequelize
  .authenticate().then(() => {
    sequelize.sync({ force: true }).then(() => {
      logger.success("Databse Sync Success");
    });
  })



