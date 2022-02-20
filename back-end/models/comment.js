// Inclure Sequelize module.
const Sequelize = require('sequelize')
const sequelize = require('./database')

const Comment = sequelize.define('comment', {

  content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    timestamps: false 
 
});
module.exports = Comment;
