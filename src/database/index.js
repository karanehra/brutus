import Sequelize from 'sequelize';
import { databaseEmitter } from '../emitters/index';
import { INITIALIZE_DATABASE } from '../constants/events';
import mysql2 from "mysql2";

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

databaseEmitter.on(INITIALIZE_DATABASE, () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
})

databaseEmitter.on('sync', () => {
  sequelize.sync().then(() => {
    console.log("DbSynced");
  });
})
import ArticleModel from "../models/article";
import FeedModel from "../models/feed";

export const Article = ArticleModel(sequelize, Sequelize);
export const Feed = FeedModel(sequelize, Sequelize);
Feed.hasMany(Article);

