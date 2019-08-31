const Sequelize = require("sequelize");
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

const Article = ArticleModel(sequelize, Sequelize);
const Feed = FeedModel(sequelize, Sequelize);
const Log = LogModel(sequelize, Sequelize);
Feed.hasMany(Article);
sequelize.authenticate();
sequelize.sync();
