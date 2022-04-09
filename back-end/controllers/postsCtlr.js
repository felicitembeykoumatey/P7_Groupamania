const fs = require("fs");
const jwt = require("jsonwebtoken"); // Récupérer de JWT
const xss = require("xss"); // xss dépendance chargée pour proteger contre les failles , piratages.
const app = require("../app"); // Recupérer notre application

// Importation pour utilisation des variables d'environnements.
//const dotenv = require("dotenv");

const multer = require("multer");

const db = require("../models/database"); // importation sequelize database
const { posts } = require("../models/database");
//const { posts } = require("../models/database");
const Post = db.posts; // Chargé fichier models post
const User = db.users; // Chargé fichier models user
const Comment = db.comments; // Chargé fichier models comments
const Like = db.likes;

// Création Post d'actualité
exports.createPost = (req, res) => {
  //Token qui permet de recupérer userdId
  //console.log("req.headers", req.headers);
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;

  //console.log("req.body", req.body);
  const post = {
    content: xss(req.body.content),
    images: req.body.files,
    userId: userId,
  };

  if (req.file != undefined) {
    post.images = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  } else {
    post.images == null;
  }

  // publication réussie
  console.log("post", post);
  Post.create(post)
    .then((data) =>
      res.status(201).json({
        message: "Publication créée!",
      })
    )
    .catch((error) =>
      res.status(400).json({
        error: error.message,
      })
    );
};

//Afficher toutes les publications

exports.getAllPosts = (req, res, next) => {
  console.log("dfdsgdsgsdgds");

  Post.findAll({
    include: [
      {
        model: Comment,
        as: "comments",
        include: ["user"],
      },
      "user",
    ],
    order: [
      ["date", "DESC"],
      ["comments", "myDate", "ASC"],
    ],
  })

    .then((posts) => {
      console.log("posts.length : ", posts.length);
      if (posts.length > 0) {
        res.status(200).json(posts); // mon gros erreur qui bloque l'affichage des posts .Ne jamains mettre res.status(200).json({pots})
      } else {
        res.status(404).json({ error: "Pas de post à afficher" });
      }
    })

    .catch((error) => res.status(500).json({ error }));
};

exports.getAllPostFromOneUser = (req, res, next) => {
  const id = req.params.userId;

  User.findByPk(id, {
    include: [
      {
        model: Post,
        as: "posts",
        include: [
          {
            model: Comment,
            as: "comments",
            include: ["user"],
          },
        ],
      },
    ],
    order: [
      ["posts", "date", "DESC"],
      ["posts", "comments", "date", "ASC"],
    ],
  })
    .then((postS) => {
      res.status(200).json(postS);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Supprimer une publication
/*
exports.deletePost = (req, res) => {
  const token = req.headers.authorization.split(" ")[1]; // Récupérer le token dans le header authorization (qui se trouve après "bearer_")
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // Décoder le token avec la fonction "verify" de jwt (vérifier le token par rapport à notre clé secrète)
  const userId = decodedToken.userId; //Récupérer  userId qui est dans l'objet decodedToken (constance decodedToken)
  const isAdminId = decodedToken.isAdminId;
  const id = req.params.id;

  Post.findByPk(id, {
    include: "user",
  })
    .then((post) => {
      if (isAdminId === 1 || userId === post.user.id) {
        if (post.file) {
          const filename = post.file.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            Post.destroy({
              where: {
                id: id,
              },
            })
              .then(() =>
                res.status(200).json({
                  message: "Post supprimé !",
                })
              )
              .catch((error) =>
                res.status(400).json({
                  error: error.message,
                })
              );
          });
        } else {
          Post.destroy({
            where: {
              id: id,
            },
          })
            .then(() =>
              res.status(200).json({
                message: "Post supprimé !",
              })
            )
            .catch((error) =>
              res.status(400).json({
                error: error.message,
              })
            );
        }
      } else {
        res.status(401).json({
          error: new Error("Mauvaise requête!"),
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};*/

// Supprimer un commentaire
exports.deletePost = (req, res) => {
  // console.log("req.params.id", req.params.id);
  Post.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "poublication  supprimé !" }))
    .catch((error) => res.status(400).json({ error: error.message }));
};

//Implementation like et unlike
exports.likePost = (req, res) => {
  try {
    //console.log(req.body);
    const { userId, postId } = req.body;
    Like.create({ postId, userId })
      .then((newLike) => {
        console.log("nouveau like créé");
        res.status(201).json(newLike);
      })
      .catch((error) => res.status(400).json(error));
  } catch {
    (error) => res.status(500).json(error);
  }
};

/* logique pour unliker un post */
exports.unlikePost = (req, res) => {
  //console.log(req.body);
  try {
    Like.destroy({
      where: { postId: req.params.postId, userId: req.body.userId },
    })
      .then((like) => {
        console.log(like);
        res.status(200);
      })
      .catch((error) => res.status(400).json(error));
  } catch {
    (error) => res.status(500).json(error);
  }
};

exports.getAllLikesPost = (req, res) => {
  try {
    Like.findAll({ where: { postId: req.params.postId }, include: User })
      .then((like) => {
        res.status(200).json(like);
      })
      .catch((error) => res.status(400).json(error));
  } catch {
    (error) => res.status(500).json(error);
  }
};
