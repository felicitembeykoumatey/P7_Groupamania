// Inclure Sequelize module.
const Sequelize = require('sequelize')
const sequelize = require('./database')

const Post = sequelize.define('post', {

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

/*/Post.associate = function(models){
  Post.belongsTo(models.User, {
    foreignKey:'userId',
    as:'user',
    onDelete: 'CASCADE',
  });
}*/

//Exportation de l'utilisateur, en utilisant cette constante
module.exports = Post;