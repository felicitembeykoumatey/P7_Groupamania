// Inclure Sequelize module.
const Sequelize = require('sequelize')
const sequelize = require('./database')

module.exports = (sequelize, Sequelize) =>{
const Comment = sequelize.define('comment', {

  content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    myDate: {
      type: Sequelize.DATE,
     defaultValue: Sequelize.NOW
    }
  }, {
    timestamps: false 
 
});
return Comment;
};
