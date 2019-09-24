export default (sequelize, types) => {
  const article = sequelize.define('article', {
    title: {
      type: types.STRING,
      allowNull: false,
    },
    link: {
      type: types.STRING,
      allowNull: false,
      unique:true
    },
    content: {
      type: types.TEXT
    },
    snippet: {
      type: types.TEXT
    }
  })
  return article;
}