// Inclure Sequelize module.
const Sequelize = require("sequelize");

const sequelize = require("./database");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    firstname: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    grade: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    sex: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(191),
      allowNull: false,
      unique: "uniqueIndex",
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    isAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
  
    date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  
  });
  return User;
};
