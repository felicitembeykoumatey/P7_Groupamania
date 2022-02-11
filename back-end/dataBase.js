"use strict";
//Importation mySql pour la base de donnée.
//Connexion data base.
const Sequelize = require("sequelize"); //Récupérer sequelize.

// Importation pour utilisation des variables d'environnements.
const dotenv = require("dotenv");
const result = dotenv.config(); // Récupérer variables d'environnement.

const path = require("path"); // Permettre de charger différents fichiers dans différents dossiers.

 ////Connecter l'API à ma base des données => Création d'un nouvel objet sequelize.
const sequelize = new Sequelize(`${process.env.DB_BDD}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`,
 { 
    
    host: "localhost",// Par défaut, l'hôte est 'localhost'.
    dialect: "mysql" // base de données mysql.
});    
sequelize.sync() //ajouter  "sequelize.sync" qui me permet de créer une table.

// Vérification de la connexion à database grâce à la fonction authenticate.
sequelize.authenticate()
  .then(() => console.log('La connexion a été établie avec succès.'))
  .catch(error => console.log({ message :'impossible de se connecter', error : error.message }));// afficher message d'erreur.


  module.exports = sequelize;