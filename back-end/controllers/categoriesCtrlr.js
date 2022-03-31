const jwt = require('jsonwebtoken'); // Récupérer de JWT
const xss = require("xss"); // xss dépendance chargée pour proteger contre les failles , piratages.
const app = require("../app"); // Recupérer notre application

// Importation pour utilisation des variables d'environnements.
const dotenv = require("dotenv");
const result = dotenv.config(); // Récupérer variables d'environnement.

const db = require('../models/database'); // importation sequelize database
const Categories = db.Categories; // Chargé fichier models categories


// Création Post
exports.create = (req, res, next) => {

  const category = {
    userId: req.body.userId,
    title: req.body.title,
    content: req.body.content,
    //imageUrl: req.file ?`${req.protocol}://${req.get('host')}/images/${req.file.filename}`:null,

  };

  Categorie.create(category)
    .then(data => res.status(201).json({
      message: "Categorie crée!"
    }))

    .catch((error) => res.status(400).json({
      error: error.message
    }));
};