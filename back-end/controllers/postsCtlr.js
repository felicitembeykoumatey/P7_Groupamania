const jwt = require('jsonwebtoken');// Récupérer de JWT
const xss = require("xss"); // xss dépendance chargée pour proteger contre les failles , piratages.
const app = require("../app"); // Recupérer notre application

// Importation pour utilisation des variables d'environnements.
const dotenv = require("dotenv");
const result = dotenv.config(); // Récupérer variables d'environnement.

const db = require('../models/database'); // importation sequelize database
const Post = db.posts; // Chargé fichier models post

// Création Post d'actualité
exports.create = (req, res, next) => {

  const post = {
   userId: req.body.userId,
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.file ?`${req.protocol}://${req.get('host')}/images/${req.file.filename}`:null,
   categories_id: req.body.categories_id,
  };

  Post.create(post)
    .then(data => res.status(201).json ({message:"Post crée!"}))
  
    .catch((error) => res.status(400).json({error: error.message}));
};

// Supprimer un statut d'actualité

exports.deletePost = (req, res, next) => {
  console.log("req.params.id") ;
  console.log(req.params.id) ;
Post.destroy({ where: { id: req.params.id}})
        .then(() => res.status(200).json({ message: "Post supprimé !" }))
        .catch(error => res.status(400).json({ error : error.message }))

 }


