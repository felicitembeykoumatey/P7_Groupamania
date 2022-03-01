// Inclure Sequelize module.
const Sequelize = require('sequelize')
//const sequelize = require('./database')

module.exports = (sequelize, Sequelize) =>{
const Post = sequelize.define('post', {

   title: {
      type: Sequelize.TEXT,
      allowNull: false
    },
  content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    imageUrl: {
      type: Sequelize.TEXT
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    timestamps: false
 
});
return Post;
};