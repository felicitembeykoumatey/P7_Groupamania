// Inclure Sequelize module.
const Sequelize = require('sequelize')

const sequelize = require('./database')

module.exports = (sequelize, Sequelize) =>{
  const Like = sequelize.define('like', {
   }, {
      freezeTableName: true,
      timestamps: true,
      updatedAt: false,
    });
  return Like;
};