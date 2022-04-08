console.log("coucou");
const jwt = require("jsonwebtoken"); // Récupérer de JWT
// Importation pour utilisation des variables d'environnements.
const dotenv = require("dotenv");
const result = dotenv.config(); // Récupérer variables d'environnement.
const xss = require("xss"); // xss dépendance chargée pour proteger contre les failles , piratages.
const app = require("../app"); // Recupérer notre application

const db = require("../models/database"); // importation sequelize database
const Like = db.likes; // Chargé fichier models likes
console.log("Like:" + Like);
//Trouver tous les likes

exports.findAllLikes = (req, res, next) => {
  console.log("zazerezazerezazer");
  Like.findById({
    where: {
      idPost: req.params.id,
    },
  })

    .then((likes) => res.status(201).json({ message: "like crée!" }))

    .catch((error) => res.status(400).json({ error: error.message }));
};

//Créer like
exports.addLike = (req, res, next) => {
  console.log("sdfzegrhgjgfdsqSDFGHJGFDS");
  const likePost = req.body;

  Like.findById({
    where: {
      idPost: req.body.idPost,
      idUser: req.body.idUser,
    },
  }).then((likes) => {
    if (likes.length === 0) {
      const like = new Like({
        ...likePost,
      });
      // Enregistrement de l'objet like dans la base de données
      like
        .save()
        .then(() => {
          Like.findById({
            where: { idPost: req.body.idPost },
          }).then((likes) => {
            res.status(200).json({ like: likes.length });
          });
        })
        .catch((error) => res.status(400).json({ error }));
    } else {
      Like.destroy({
        where: {
          idPost: req.body.idPost,
          users_id: req.body.users_id,
        },
      })
        .then(() => {
          Like.findById({
            where: { idPost: req.body.idPost },
          }).then((likes) => {
            res.status(200).json({ like: likes.length });
          });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
    }
  });
};
