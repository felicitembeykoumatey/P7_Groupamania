const jwt = require('jsonwebtoken');// Récupérer de JWT
//const xss = require("xss"); // xss dépendance chargée pour proteger contre les failles , piratages.

// Importation pour utilisation des variables d'environnements.
const dotenv = require("dotenv");
const result = dotenv.config(); // Récupérer variables d'environnement.

const  { sequelize }  = require('../database'); // importation sequelize database

const db = require ('../models/post'); // Chargé fichier models post

// Création Post
exports.createPost = (req, res, next) =>{
  const token = req.headers.authorization.split(' ')[1];
 const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
  const userId = decodedToken.userId;

const User = db.Users;
User.findOne ({
  where: {
    id: userId
  }
})
.then(user =>{
  if(user == null){
    return res.status(400).json({error:"Utilisateur introuvable!", error: error.message});
  }
})
.catch((error) => { res.status(500).json({error : error.message});
  
})

const Posts = db.Posts;

const newPost = Posts.create({
  
  user_id: userId, 
  content: req.body.content,
  attachements: req.body.content && req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: null,

})


.then(newPost =>res.status(201).json(newPost))
.catch((error) => {res.status(400).json({error: erro.message});
  
})


};
console.log( "User");
console.log("Posts");
console.log("newPost");
