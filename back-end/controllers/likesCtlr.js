const jwt = require("jsonwebtoken"); // Récupérer de JWT
// Importation pour utilisation des variables d'environnements.
//const dotenv = require("dotenv");
//const result = dotenv.config(); // Récupérer variables d'environnement.
//const xss = require("xss"); // xss dépendance chargée pour proteger contre les failles , piratages.
const app = require("../app"); // Recupérer notre application

const db = require("../models/database"); // importation sequelize database
const Like = db.likes; // Chargé fichier models likes
console.log("Like:" + Like);
//Trouver tous les likes

exports.findAllLikes = (req, res) => {
  console.log("zazerezazerezazer");
  Like.findById({
    where: {
      postId: req.params.id,
    },
  })

    .then(() => res.status(201).json({ message: "like crée!" }))

    .catch((error) => res.status(400).json({ error: error.message }));
};

//Créer like
exports.addLike = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  // console.log("sdfzegrhgjgfdsqSDFGHJGFDS");
  const likePost = req.body;

  Like.findById({
    where: {
      postId: req.body.postId,
      userId: req.body.userId,
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
            where: { postId: req.body.postId },
          }).then((likes) => {
            res.status(200).json({ like: likes.length });
          });
        })
        .catch((error) => res.status(400).json({ error }));
    } else {
      Like.destroy({
        where: {
          postId: req.body.postId,
          userId: req.body.userId,
        },
      })
        .then(() => {
          Like.findById({
            where: { postId: req.body.postId },
          }).then((likes) => {
            res.status(200).json({ like: likes.length });
          });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
    }
  });
};
