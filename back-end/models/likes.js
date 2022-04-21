// Inclure Sequelize module.
const sequelize = require('./database');
const Sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) =>{
  const Like = sequelize.define('like', {
   }, {
     likes:sequelize.INTEGER
    });
  return Like;
};