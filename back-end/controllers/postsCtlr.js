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
categories_idcategories: req.body.categories_idcategories,
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



 //Ajouter like/dislike

 
exports.addLike = (req, res, next) => {
  const userLike = req.body.like;
  console.log(like)
  const userId = req.body.userId;

  Post.findOne({ _id: req.params.id })
    .then((post) => {
      const usersLiked = post.usersLiked;
      const usersDisliked = post.usersDisliked;

      //si 0
      if (userLike == 0) {
        //où est l'utisisateur?
        const foundUserLiked = usersLiked.find((usersId) => usersId == userId);
        const foundUserDisliked = usersDisliked.find(
          (usersId) => usersId == userId
        );

        //si dans liked
        if (foundUserLiked) {
          //suppression dans Usersliked et -1 dans likes
          Post.updateOne(
            { _id: req.params.id },
            { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
          )
            .then(() =>
              res.status(200).json({ message: "L'utilisateur n'aime plus" })
            )
            .catch((error) => res.status(400).json({ error: error.message }));

          //si dans disliked
        } else if (foundUserDisliked) {
          //suppression dans Usersdisliked et -1 dans dislikes
          Post.updateOne(
            { _id: req.params.id },
            { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
          )
            .then(() =>
              res.status(200).json({ message: "L'utilisateur ne déteste plus" })
            )
            .catch((error) => res.status(400).json({ error: error.message}));
        }

        //si 1
      } else if (userLike == 1) {
        //ajout dans Usersliked et +1 dans likes
        Post.updateOne(
          { _id: req.params.id },
          { $push: { usersLiked: userId }, $inc: { likes: 1 } }
        )
          .then(() => res.status(200).json({ message: "L'utilisateur aime" }))
          .catch((error) => res.status(400).json({ error : error.message}));

        //si -1
      } else if (userLike == -1) {
        //ajout dans Usersdisliked et +1 dans dislikes
        Post.updateOne(
          { _id: req.params.id },
          { $push: { usersDisliked: userId }, $inc: { dislikes: 1 } }
        )
          .then(() =>
            res.status(200).json({ message: "L'utilisateur n'aime pas" })
          )
          .catch((error) => res.status(400).json({ error : error.message}));
      }
    })
    .catch((error) => {
      res.status(404).json({ error: error.message });
    });
};