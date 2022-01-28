
//Connexion data base //
const {Sequelize}= require('sequelize'); //Récupérer sequelize//
require("dotenv").config() // Récupérer variables d'environnement//
const mysql = require ('mysql');

 
const sequelize = new Sequelize(`${process.env.DB_BDD}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`,
 { 
    dialect: "mysql",
    host: "localhost"
  
});    
sequelize.authenticate()
  .then(() => console.log('La connexion a été établie avec succès.'))
  .catch((error) => console.log('Impossible de se connecter à la base de données :', error));


  module.exports= sequelize;