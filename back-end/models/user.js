// Inclure Sequelize module.
const Sequelize = require('sequelize')

const sequelize = require('./database')


module.exports = (sequelize, Sequelize) =>{
  const User = sequelize.define('user', {
    username: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    sex: {
      type: Sequelize.STRING(1),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(191),
      allowNull: false,
      unique : 'uniqueIndex'
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    
    isAdmin : {
      type: Sequelize.BOOLEAN,
      allowNull:false,
      defaultValue:0,
    },
    // horodatage valeur date et heure
    date: { type: Sequelize.DATE,
      defaultValue: Sequelize.NOW }
  //  updatedAt: Sequelize.DATE,
  });
  return User;
};