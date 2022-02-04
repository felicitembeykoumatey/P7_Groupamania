// Déclarations des constances//
const express = require('express'); ///Importer express ///
const app = express(); // création d'une application express//
const db = require('./database');
const { Sequelize } = require('sequelize');// Récupérer sequelize
const bodyParser = require('body-parser'); // Récupérer le bodyParser//

const path = require('path'); // Récupèrer l'élément de node.js permettant d'accéder au chemin de notre systeme de fichiers
const helmet = require("helmet"); // Récupèrer Helmet (sécuriser les applis Express en définissant divers en-têtes HTTP)
const userRoutes = require('./routes/user'); //Récupèrer route User//
const postRoutes = require ('./routes/post'); // Récupèrer route post///
const commentRoutes = require ('./routes/comment'); // Récupérer route commentaire


//Contrôle d'accès *CROSS ORIGIN RESOURCE SHARING 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');//droit d'accéder à notre api = tout le monde grâce à ce symbole 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Autoriser les headers//
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Autoriser  certaines méthodes GET POST PUT DELETE PATH OPTIONS
  next();
});

//HELMET protége notre application de certaines vulnaribilités///
app.use(helmet());
// Body Parser 
app.use(bodyParser.json()); // .json méthode de l'objet bodyParser qui va transformer le corps des requêtes en objets JSON
app.use(express.json());

// CHEMIN D'ACCES DES ENDPOINTS 


app.use('/images', express.static(path.join(__dirname, 'images'))); // cette requête sert le dossier statique /image dont l'adresse est déterminé par la méthode path.join (avec __dirname = nom du dossier dans lequel on va se trouver auquel on va ajouter "images"

app.use('/', userRoutes);
app.use('/api/auth', postRoutes);


const dbTest = async function () {
  try {
    await db.authenticate();
    console.log('La connexion a été établie avec succès.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données :', error);
  }
};
dbTest();

// Exporter le server
module.exports = app;  // export de l'application express (pour le serveur node.js)