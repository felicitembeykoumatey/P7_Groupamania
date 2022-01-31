//Importation mySql pour la base de donnée
const mysql = require ('mysql');
//Connexion data base //
const {Sequelize}= require('sequelize'); //Récupérer sequelize//
// Importation pour utilisation des variables d'environnements
const dotenv = require("dotenv");
const result = dotenv.config(); // Récupérer variables d'environnement//

 ////Connecter l'API à ma base des données => utlisation de Sequelize
const sequelize = new Sequelize(`${process.env.DB_BDD}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`,
 { 
    dialect: "mysql",
    host: "localhost"
  
});    

// Vérification de la connexion à database grâce à la fonction authenticate
sequelize.authenticate()
  .then(() => console.log('La connexion a été établie avec succès.'))
  .catch((error) => console.log('Impossible de se connecter à la base de données :', error));// afficher message d'erreur


  module.exports= sequelize;