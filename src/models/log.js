export default (sequelize, types) => {
  const log = sequelize.define("log", {
    title: {
      type: types.STRING,
      allowNull: false
    },
    description: {
      type: types.TEXT
    },
    log_type: {
      type: types.ENUM,
      values: ["SUCCESS", "ERROR", "INFO", "FATAL"]
    },
    tag: {
      type: types.STRING
    }
  });
  return log;
};
