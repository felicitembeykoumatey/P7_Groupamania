// Inclure Sequelize module.
const Sequelize = require('sequelize')
// Importation de l'objet séquentiel,
// connexion à la base de données géré par Sequelize.

const sequelize = require('../database')
const posts = require("./post");
const User = sequelize.define('user', {
  
  username: {
    type: Sequelize.STRING(20),
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
  sex: {
    type: Sequelize.STRING(1),
    allowNull: false
  },
  myDate: { type: Sequelize.DATE,
    defaultValue: Sequelize.NOW },
  
  // horodatage valeur date et heure
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
  User.hasMany(posts,{
   foreignKey : 'userId',
   as:'posts',
  })




//Exportation de l'utilisateur, en utilisant cette constante
module.exports = User;