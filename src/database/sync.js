// import Sequelize from "sequelize";
// import { databaseEmitter } from "../emitters/index";
// import { INITIALIZE_DATABASE, SYNC_DATABASE } from "../constants/events";
// import mysql2 from "mysql2";
// import ArticleModel from "../models/article";
// import FeedModel from "../models/feed";
// import LogModel from "../models/log";

const Sequelize = require("sequelize");
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

// databaseEmitter.on(INITIALIZE_DATABASE, () => {
// });

// databaseEmitter.on(SYNC_DATABASE, () => {
// });

const Article = ArticleModel(sequelize, Sequelize);
const Feed = FeedModel(sequelize, Sequelize);
const Log = LogModel(sequelize, Sequelize);
Feed.hasMany(Article);
sequelize.authenticate();

sequelize.sync();
