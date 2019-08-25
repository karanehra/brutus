export default (sequelize, types) => {
  const log = sequelize.define('log', {
    title: {
      type: types.STRING,
      allowNull: false,
    },
    description: {
      type: types.TEXT,
    },
    error_type:{
      type:types.ENUM,
      values: ['SUCCESS', 'ERROR', 'INFO','FATAL']
    }
  })
  return log;
}