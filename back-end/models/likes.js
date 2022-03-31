// Inclure Sequelize module.
const Sequelize = require('sequelize');

const sequelize = require('./database');

module.exports = (sequelize, Sequelize) =>{
  const Like = sequelize.define('like', {
   }, {
     idUser: sequelize.INTEGER,
     idPost: sequelize.INTEGER,
     likes:sequelize.INTEGER
    });
  return Like;
};