export default (sequelize, types) => {
  const note = sequelize.define("note", {
    title: {
      type: types.STRING,
      allowNull: false
    },
    description: {
      type: types.TEXT
    },
  });
  return note;
};
