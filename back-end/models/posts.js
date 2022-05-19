/* Inclure Sequelize module.
const Sequelize = require("sequelize");

const sequelize = require("./database"); // ma base des données MySQL*/
module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    "post",
    {
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      images: {
        type: Sequelize.TEXT,
      },

      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      timestamps: false,
    }
  );
  return Post;
};
