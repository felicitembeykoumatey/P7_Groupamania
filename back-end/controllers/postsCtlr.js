const fs = require("fs");
const jwt = require("jsonwebtoken"); // Récupérer de JWT
const xss = require("xss"); // xss dépendance chargée pour proteger contre les failles , piratages.
const app = require("../app"); // Recupérer notre application
const db = require("../models/database"); // importation sequelize database
const Post = db.posts; // Chargé fichier models post
const User = db.users; // Chargé fichier models user
const Comment = db.comments; // Chargé fichier models comments
const Like = db.likes;

// Création Post d'actualité
exports.createPost = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
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

  // publication créée

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

exports.getAllPosts = (req, res) => {
 
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
     // console.log("posts.length : ", posts.length);
      if (posts.length > 0) {
        res.status(200).json(posts); // mon gros erreur qui bloque l'affichage des posts .Ne jamains mettre res.status(200).json({pots})
      } else {
        res.status(404).json({ error: "Pas de post à afficher" });
      }
    })

    .catch((error) => res.status(500).json({ error }));
};

exports.getAllPostFromOneUser = (req, res) => {
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

exports.deletePost = (req, res) => {
  // console.log("req.params.id", req.params.id);
  Post.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "poublication  supprimé !" }))
    .catch((error) => res.status(400).json({ error: error.message }));
};

//Implementation like et unlike
exports.likePost = (req, res) => {
  const postId = req.body.postId;
  const userId = req.body.userId;
  console.log("req.body.userId : ", req.body.userId);
  Like.findOne({
    where: { postId: postId, userId: userId },
  })
    .then((like) => {
      if (!like) {
        // console.log("je suis dans !like");
        Like.create({ postId, userId }).then((newLike) => {
          // console.log("nouveau like créé");
          res.status(201).json(newLike);
        });
      } else {
        like.destroy()
        res.status(200).json();

      }
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};


exports.getAllLikesPost = (req, res) => {
  try {
    Like.findAll({
      where: { postId: req.params.postId },
    })
      .then((like) => {
        return res.status(200).json(like);
      })
      .catch((error) => res.status(400).json(error));
  } catch {
    (error) => res.status(500).json(error);
  }
};
