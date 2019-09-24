import Sequelize  "sequelize "
import mysql2  "mysql2 "
import ArticleModel  "../models/article "
import FeedModel  "../models/feed "
import LogModel  "../models/log "

import sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    dialectModule: mysql2,
    host: process.env.DB_HOST
  }
);

import Article = ArticleModel(sequelize, Sequelize);
import Feed = FeedModel(sequelize, Sequelize);
import Log = LogModel(sequelize, Sequelize);
Feed.hasMany(Article);
sequelize.authenticate();
sequelize.sync();
