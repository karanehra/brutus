export default (sequelize, types) => {
  const board = sequelize.define("board", {
    name: {
      type: types.STRING,
      allowNull: false
    }
  });
  return board;
};
