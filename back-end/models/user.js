// Inclure Sequelize module.
const Sequelize = require('sequelize')
// Importation de l'objet séquentiel,
// connexion à la base de données géré par Sequelize.

const sequelize = require('./database')
const Post = require("./post");

const User = sequelize.define('user', {
 /* user_id: {
    type: Sequelize.INTERGER,
     autoIncrement:true,
    type: Sequelize.SMALLINT,
    allowNull: false,
    primaryKey: true,
  },*/
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
    defaultValue: false,
  },
  // horodatage valeur date et heure
  date: { type: Sequelize.DATE,
    defaultValue: Sequelize.NOW },
  updatedAt: Sequelize.DATE,
});

User.hasMany(Post);
Post.belongsTo(User);



//Exportation de l'utilisateur, en utilisant cette constante

module.exports = User;