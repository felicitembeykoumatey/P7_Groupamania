// Inclure Sequelize module.
const Sequelize = require('sequelize')
const sequelize = require('../database')


const Post = sequelize.define('post', {

  content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING(191)
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    timestamps: false
 
});


//Exportation de l'utilisateur, en utilisant cette constante
module.exports = Post
