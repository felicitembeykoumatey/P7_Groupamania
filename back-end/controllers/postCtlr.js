const jwt = require('jsonwebtoken');// Récupérer de JWT
const xss = require("xss"); // xss dépendance chargée pour proteger contre les failles , piratages.
const app = require("../app"); // Recupérer notre application

// Importation pour utilisation des variables d'environnements.
const dotenv = require("dotenv");
const result = dotenv.config(); // Récupérer variables d'environnement.

const db = require('../models/database'); // importation sequelize database
const Post = db.posts; // Chargé fichier models post

// Création Post
exports.create = (req, res, next) => {

  const post = {
   userId: req.body.userId,
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.file ?`${req.protocol}://${req.get('host')}/images/${req.file.filename}`:null,
    
  };

  Post.create(post)
    .then(data => res.status(201).json ({message:"Post crée!"}))
  
    .catch((error) => res.status(400).json({error: error.message}));
};


//obtenir tous les posts et commentaires
exports.findAllPost = (req, res, next) => {
 
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

exports.findAllPostFromOneUser = (req, res, next) => {
  const id = req.params.userId;

  // obtenir tous les posts et commentaire d'un utilisateur grace à sa clé primaire
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

// Obtenir un post grace à la clé primaire
exports.findOnePost = (req, res, next) => {
  const postId = req.params.id;

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

exports.modifyPost = (req, res, next) => {
 // déclaration constances, token secret
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'KEY_TOKEN');
  const userId = decodedToken.userId
  const id = req.params.id;
  const post = {};

  if (req.body.content) {
    const postObject = req.body.content;
    post.content = xss(postObject.text)
  }

  if (req.file) {
    post.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }

  // Obtenir un post par sa clé primaire
  Post.findByPk(id, { include: "user" })
    .then((oldpost) => {

      if (userId === oldpost.user.id) { // est-ce l'auteur du post


        if (req.file){

          if(!post.content){
            post.content = oldpost.content
          }

          if(oldpost.image){
            const filename = oldpost.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {

              
              Post.update(post, { where: { id: id }}) //post modifié
              .then(data => {
                res.status(201).json({ message: 'Post modifié !' })
              })
              .catch(error => res.status(500).json({ error }));
            });

          }else{
            // post modifié
            Post.update(post, { where: { id: id }})
            .then(data => {
              res.status(201).json({ message: 'Post modifié !' })
            })
            .catch(error => res.status(500).json({ error : error.message}));
          }
        }

        else{ // si pas d'image , poste modifié
          Post.update(post, { where: { id: id }})
          .then(data => {
            res.status(201).json({ message: 'Post modifié !' })
          })
          .catch(error => res.status(500).json({ error }));
        }

      }else{ // sinon, erreur s'affiche requete invalide
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

// suppression post
exports.deletePost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'KEY_TOKEN');
  const roleId = decodedToken.roleId
  const userId = decodedToken.userId
  const id = req.params.id;

  //Trouver un post par clé primaire avant de supprimer 
  Post.findByPk(id, { include: "user" })
  .then((post) => {

    if (roleId === 2 || userId === post.user.id) {
     
      if (post.image) {
        //suppression de l'image originale
        const filename = post.image.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {

          //suppression post
          Post.destroy({ where: { id : id }})
          .then(() => res.status(200).json({ message: 'Post supprimé !'}))
          .catch(error => res.status(400).json({ error : error.message}));
        });

      
      }else{
        Post.destroy({ where: { id : id }})
        .then(() => res.status(200).json({ message: 'Post supprimé !'}))
        .catch(error => res.status(400).json({ error }));
      }

 
    }else{
      res.status(401).json({
        error: new Error('Invalid request!')
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


















/*//Modifier un post
exports.update = (req, res) => {
 const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userId = decodedToken.userId
  const id = req.params.id;

  const post = {}; // variable vide pour stockage
  if(req.body.content){ // il s'agit du contenu du post.
    const postContents = req.body.content; 
    post.content = xss(postContents.text)
  }
  

  if (req.file) {// il s'agit d'image
    post.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }

  //Obtenir un post via clé primaire
  Post.findByPk(id, {include:"user"})
  .then ((oldPost) => {
    // l'auteur du post? 

    if (userId === oldPost.user.id)

    {
      // image , fichier? 

      if(req.file){
        if(!post.content){
          post.content = oldPost.content
         }

    if(oldPost.image){

   // supprimer l'ancienne image

  const filename = oldPost.split('/images/')[1];
   fs.unlink(`images/${filename}`, () =>{

  Post.update(post, {where:{id:id}})

  .then(data =>{res.status(201).json({message: "Post modifié !"})})
  .catch(((error =>res.status(500).json({error: error.message}))
 
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
          error: new Error('Invalid request!')
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
*/








//Afficher le fil d'actualité

exports.listMsg = (req, res) => {
models.Post.findAll({
        include: [{
            model: models.User,
            attributes: ['username']
        }],
        order: [['createdAt', 'DESC']]
    })
.then(posts => {
            if (posts.length > null) {
                res.status(200).json(posts)
            }else {
                res.status(404).json({ error: 'Pas de post à afficher' })
            }
        })
 .catch(error => res.status(500).json({ error : error.message  }));


}
