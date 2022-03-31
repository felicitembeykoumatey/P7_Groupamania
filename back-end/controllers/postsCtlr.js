const fs = require('fs');
const jwt = require('jsonwebtoken');// Récupérer de JWT
const xss = require("xss"); // xss dépendance chargée pour proteger contre les failles , piratages.
const app = require("../app"); // Recupérer notre application

// Importation pour utilisation des variables d'environnements.
const dotenv = require("dotenv");
// Importation pour utilisation des variables d'environnements.
require("dotenv").config(); //Cacher les mots de passe des utilisateurs.
const db = require('../models/database'); // importation sequelize database
const Post = db.posts; // Chargé fichier models post
const User = db.users; // Chargé fichier models user
const Comment = db.comments; // Chargé fichier models comments

// Création Post d'actualité
exports.createPost = (req, res, next) => {
  
  const post = {
    content: xss(req.body.content),
    images: req.body.files,
    userId: req.body.userId,
    categories_id: req.body.categories_id,
  };
  
  if (req.file) {
    post.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    
  }
  
  // publication réussie
  
  Post.create(post)
    .then(data => response.status(201).json({
      message: "Publication créée!"
    }))
  
    .catch((error) => res.status(400).json({
      error: error.message
    }));
};


//Afficher tous les publications

exports.getAllPosts = (req, res, next) => {
  //console.log('azertyujikol')
  Post.findAll({
    order: [
      ['createdAt', "DESC"]
    ],
    include: [
      
      {
        model: User,
        as: 'comments',
        include: ["user"]
      },
      "user"
    ]
  })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => res.status(500).json(error));
  
};


exports.getAllPostFromOneUser = (req, res, next) => {
  const id = req.params.userId;
  
  User.findByPk(id, {
    include: [{
      model: Post,
      as: 'posts',
      include: [{
        model: Comment,
        as: 'comments',
        include: ["user"]
      }, ],
    }, ],
    order: [
      ['posts', 'date', 'DESC'],
      ['posts', 'comments', 'date', 'ASC']
    ]
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};


exports.getOnePost = (req, res, next) => {
  const id = req.params.id;
  Post.findByPk(id, {
    include: [{
      model: Comment,
      as: 'comments',
      include: ["user"]
    },
    "user"
    ],
    order: [
      ['comments', 'date', 'ASC']
    ]
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

//Modifier une publication

exports.modifyPost = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]; // Récupérer le token dans le header authorization (qui se trouve après "bearer_")
  const decodedToken = jwt.verify(token, process.env.KEY_TOKEN); // Décoder le token avec la fonction "verify" de jwt (vérifier le token par rapport à notre clé secrète)
  const userId = decodedToken.userId; //Récupérer  userId qui est dans l'objet decodedToken (constance decodedToken)
  const id = req.params.id;
  const post = {};
  
  if (req.body.content) {
    
    post.content = req.body.content
  }
  
  if (req.file) {
    post.files = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  
  Post.findByPk(id, {
    include: "user"
  })
    .then((oldpost) => {
      
      if (userId === oldpost.user.id) {
        
        if (req.file) {
          
          
          if (!post.content) {
            post.content = oldpost.content
          }
          
          if (oldpost.file) {
            
            const filename = oldpost.file.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
              
              
              Post.update(post, {
                where: {
                  id: id
                }
              })
                .then(data => {
                  res.status(201).json({
                    message: 'Post modifié !'
                  })
                })
                .catch(error => res.status(500).json({
                  error
                }));
            });
            
          } else {
            
            Post.update(post, {
              where: {
                id: id
              }
            })
              .then(data => {
                res.status(201).json({
                  message: 'Publication modifié !'
                })
              })
              .catch(error => res.status(500).json({
                error
              }));
          }
        } else {
          Post.update(post, {
            where: {
              id: id
            }
          })
            .then(data => {
              res.status(201).json({
                message: 'Publication modifié !'
              })
            })
            .catch(error => res.status(500).json({
              error
            }));
        }
        
        
      } else {
        res.status(401).json({
          error: new Error('!')
        });
      }
      
    })
    .catch(
      (error) => {
        res.status(400).json({
          error: error.message
        });
      }
    );
};

// Supprimer une publication

exports.deletePost = (req, res, next) => {
  
  const token = req.headers.authorization.split(" ")[1]; // Récupérer le token dans le header authorization (qui se trouve après "bearer_")
  const decodedToken = jwt.verify(token, process.env.KEY_TOKEN); // Décoder le token avec la fonction "verify" de jwt (vérifier le token par rapport à notre clé secrète)
  const userId = decodedToken.userId; //Récupérer  userId qui est dans l'objet decodedToken (constance decodedToken)
  const isAdminId = decodedToken.isAdminId;
  const id = req.params.id;
  
  
  Post.findByPk(id, {
    include: "user"
  })
    .then((post) => {
      
      
      if (isAdminId === 1 || userId === post.user.id) {
        
        if (post.file) {
          
          const filename = post.file.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            
            
            Post.destroy({
              where: {
                id: id
              }
            })
              .then(() => res.status(200).json({
                message: 'Post supprimé !'
              }))
              .catch(error => res.status(400).json({
                error: error.message
              }));
          });
          
        } else {
          Post.destroy({
            where: {
              id: id
            }
          })
            .then(() => res.status(200).json({
              message: 'Post supprimé !'
            }))
            .catch(error => res.status(400).json({
              error: error.message
            }));
        }
        
      } else {
        res.status(401).json({
          error: new Error('Mauvaise requête!')
        });
      }
    })
    .catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};
