// Inclure Sequelize module.
const Sequelize = require('sequelize')

// Importation de l'objet séquentiel,
// Pool de connexion à la base de données géré par Sequelize.
const sequelize = require('../database')
// La méthode Define prend deux arguments
// 1er - nom de la table
// 2ème - colonnes à l'intérieur du tableau
const User = sequelize.define('user', {
  
  // Column-1, user_id est un objet avec
  // propriétés comme le type, les clés,
  // validation de la colonne.
  user_id:{
    type:Sequelize.INTEGER,// Le module Sequelize a INTEGER Data_Type.
    autoIncrement:true, // To increment user_id automatically.
    allowNull:false,// user_id ne peut pas être nul.
    primaryKey:true// Pour identifier l'utilisateur de manière unique.
  },
  name: { type: Sequelize.STRING, allowNull:false },  // Column-2, name
  email: { type: Sequelize.STRING, allowNull:false }, // Column-3, email
  
  // Colonne-4, valeurs par défaut
  // dates => heure actuelle
  myDate: { type: Sequelize.DATE,
    defaultValue: Sequelize.NOW },
  
  // horodatage valeur date et heure
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

//Exportation de l'utilisateur, en utilisant cette constante
// nous pouvons effectuer des opérations CRUD sur
// table 'utilisateur'.
module.exports = User