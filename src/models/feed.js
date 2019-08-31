module.exports = (sequelize, types) => {
  const feed = sequelize.define("feed", {
    title: {
      type: types.STRING,
      allowNull: false
    },
    url: {
      type: types.STRING,
      allowNull: false
    },
    image_url: {
      type: types.STRING
    },
    description: {
      type: types.STRING
    }
  });
  return feed;
};
