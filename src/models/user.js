export default (sequelize, types) => {
  const user = sequelize.define("user", {
    firstname: {
      type: types.STRING,
      allowNull: false,
      validate: {
        is: /^[a-z]+$/i
      }
    },
    lastname: {
      type: types.TEXT
    },
    userType: {
      type: types.ENUM,
      values: ["MASTER", "STANDARD", "ADMIN"],
      allowNull: false
    },
    passwordHash: {
      type: types.STRING,
      allowNull: false
    },
    email: {
      type: types.STRING,
      validate: {
        isEmail: true
      },
      unique: true
    }
  });
  return user;
};
