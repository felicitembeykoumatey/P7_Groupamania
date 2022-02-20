console.log("coucou");
const jwt = require('jsonwebtoken');// Récupérer de JWT
const xss = require("xss"); // xss dépendance chargée pour proteger contre les failles , piratages.
const app = require("../app");

// Importation pour utilisation des variables d'environnements.
const dotenv = require("dotenv");
const result = dotenv.config(); // Récupérer variables d'environnement.

const  { sequelize }  = require('../models/database'); // importation sequelize database

const Post = require ('../models/post'); // Chargé fichier models post

// Création Post
exports.createPost = (req, res, next) => {
  //const postObject = (req.body.post);
  // postObject._id;
  console.log("req.body")
  console.log(req.body)
  console.log(req.body.title)
  const post = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.file ?`${req.protocol}://${req.get('host')}/images/${req.file.filename}`:null,
    user_id: req.body.userId

   /* ...postObject,
    user_id: xss(postObject.userid),
    content : xss(postObject.text),
    image: `${req.protocol}://${req.get("host")}/images/${ 
      req.file.filename
    }`,
  };  
  post.save()
    .then(() => res.status(201).json ({message:"Post enregistré!"}))
    .catch((error) => res.status(400).json({error: error.message}));*/


};
console.log(post)
Post.create(post)
.then(() => res.status(201).json ({message:"Post crée!"}))
    .catch((error) => res.status(400).json({error: error.message}))
}