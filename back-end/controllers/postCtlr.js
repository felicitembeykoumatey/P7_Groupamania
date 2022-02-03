const jwt = require('jsonwebtoken');// Récupérer de JWT
const xss = require("xss"); // xss dépendance chargée pour proteger contre les failles , piratages.
const Post = require("../models/post");
console.log("Post:"+Post);
//const Post = db.posts;
//const User = db.users;
const db = require('../database');


//  Exportation des posts crées.
exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.content);
  
  const post = {
    content: xss(postObject.text),
    image : "",
    userId: xss(postObject.userid)
  };
  
  if (req.file) {
    post.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  
  // Création post
  Post.create(post)
    .then(data => {
      res.status(201).json({ message: 'Post créé !' }) // response ok
    })
    .catch(error => res.status(500).json({ error })); // message : gestion d'erreur
};

// Exportation requête get de tous les posts
exports.getAllPost = (req, res, next) => {
  Post.findAll({
    include: [
      {
        model : Comment,
        as: 'comments',
        include : [ "user"]
      },
      "user"
    ],
    order: [
      ['date', 'DESC'],
      ['comments','date', 'ASC']
    ]
  })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

// Exportation de la requete get de tous les post d'un utilisateur


exports.getAllPostFromOneUser = (req, res, next) => {
  const id = req.params.userId;
  User.findByPk(id, {
    include: [
      {
        model : Post,
        as: 'posts',
        include: [
          {
            model : Comment,
            as: 'comments',
            include : [ "user"]
          },
        ],
      },
    ],
    order: [
      ['posts', 'date', 'DESC'],
      ['posts', 'comments','date', 'ASC']
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

//Exportation de laa requête get d'un post//
// utilisation methode sequelize " findByPk " pour obtenir une seule entrée de la table à l'aide de la clé primaire fournie
exports.getOnePost = (req, res, next) => {
  const id = req.params.id;
  Post.findByPk(id, {
    include: [
      {
        model : Comment,
        as: 'comments',
        include : [ "user"]
      },
      "user"
    ],
    order: [['comments','date', 'ASC']]
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


//  Modification des posts


exports.modifyPost = (req, res, next) => {
  //init info
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userId = decodedToken.userId
  const id = req.params.id;
  const post = {};
  
  if (req.body.content) {
    const postObject = JSON.parse(req.body.content);
    post.content = xss(postObject.text)
  }
  
  if (req.file) {
    post.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  
  
  Post.findByPk(id, { include: "user" })
    .then((oldpost) => {
      
      if (userId === oldpost.user.id) {
        
        if (req.file){
          
          if(!post.content){
            post.content = oldpost.content
          }
          
          if(oldpost.image){
            
            const filename = oldpost.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
              
              
              Post.update(post, { where: { id: id }})
                .then(data => {
                  res.status(201).json({ message: 'Post modifié !' })
                })
                .catch(error => res.status(500).json({ error }));
            });
            
          }else{
            
            
            Post.update(post, { where: { id: id }})
              .then(data => {
                res.status(201).json({ message: 'Post modifié !' })
              })
              .catch(error => res.status(500).json({ error }));
          }
        }
        else{
          Post.update(post, { where: { id: id }})
            .then(data => {
              res.status(201).json({ message: 'Post modifié !' })
            })
            .catch(error => res.status(500).json({ error }));
        }
        
        
      }else{
        res.status(401).json({
          error: new Error('Requête invalide!')
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


// Suppressions des posts

exports.deletePost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'KEY_TOKEN ');
  const roleId = decodedToken.roleId
  const userId = decodedToken.userId
  const id = req.params.id;
  
  Post.findByPk(id, { include: "user" })
    .then((post) => {
      
      if (roleId === 2 || userId === post.user.id) {
        
        if (post.image) {
          
          // original image supprimée
          const filename = post.image.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            
            //post supprimer grâce à la fonction destroy
            Post.destroy({ where: { id : id }})
              .then(() => res.status(200).json({ message: 'Post supprimé !'}))
              .catch(error => res.status(400).json({ error }));
          });
          
          
        }else{
          Post.destroy({ where: { id : id }})
            .then(() => res.status(200).json({ message: 'Post supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        }
        
        
      }else{
        res.status(401).json({
          error: new Error('Requête invalide!')
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