const xss = require("xss");
const jwt = require("jsonwebtoken");
// Importation pour utilisation des variables d'environnements.
//const dotenv = require("dotenv");
// Importation pour utilisation des variables d'environnements.
//require("dotenv").config(); //Cacher les mots de passe des utilisateurs.
const db = require("../models/database");
const Comments = db.comments;
//const User = db.users;

//Créer un commentaire
exports.createComment = (req, res) => {
  console.log("fqsfsqfsqfqf11111");

  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  console.log("userId : ", userId);
  const comment = {
    userId: userId,
    postId: req.body.postId,
    content: req.body.content,
  };
  console.log("comment : ", comment);
  Comments.create(comment)

    .then((data) => res.status(201).json({ message: "Commentaire ajouté !" }))
    .catch((error) => res.status(400).json({ error }));
  console.log("Comments.create");
};

// Un seul commentaire affiché

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
    }) // Succès
    .catch((error) => res.status(404).json({ error: error.message })); // Gestion d'erreur
};

// Modifier un commentaire
exports.modify = (req, res, next) => {
  Comments.update({ ...req.body }, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Commentaire modifié !" }))
    .catch((error) => res.status(400).json({ error: error.message }));
};

// Supprimer un commentaire
exports.delete = (req, res, next) => {
  console.log("req.params.id", req.params.id);
  Comments.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
    .catch((error) => res.status(400).json({ error: error.message }));
};
