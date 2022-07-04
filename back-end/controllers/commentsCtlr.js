const jwt = require("jsonwebtoken");
// Importation pour utilisation des variables d'environnements.
const db = require("../models/database");
const Comments = db.comments;

//Créer un commentaire
exports.createComment = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  const comment = {
    userId: userId,
    postId: req.body.postId,
    content: req.body.content,
  };
  Comments.create(comment)
    .then(() => res.status(201).json({ message: "Commentaire ajouté !" }))
    .catch((error) => res.status(400).json({ error }));
  // console.log("Comments.create");
};

// Affichage d'un seul commentaire

exports.getAllComment = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  Comments.findOne({
    postId: req.body.postId,
    userId: userId,
    content: req.body.content,
  })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((error) => res.status(404).json({ error: error.message })); // Gestion d'erreur
};

// Supprimer un commentaire
exports.delete = (req, res) => {
  // console.log("req.params.id", req.params.id);
  Comments.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.getAllCountComment = (req, res) => {
  try {
    Comments.count({
      where: { commentId: req.params.commentId },
    })
      .then((comment) => {
        return res.status(200).json(comment);
      })
      .catch((error) => res.status(400).json(error));
  } catch {
    (error) => res.status(500).json(error);
  }
};
