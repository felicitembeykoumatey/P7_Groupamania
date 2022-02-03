const xss = require('xss');
const jwt = require('jsonwebtoken');
const db = require('../models/commentary');
const Comment = db.comments;

//Obtenir un seul commentair de l'auteur
exports.getOneCommentary =(req, res, next)  => {
  const id = req.params.id;
  Comment.findByPk(id, {
    include: [ "user"],
  })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

// création commentaire

exports.createCommentary = (req, res, next) => {
  const commentObject = req.body;
  const comment = {
    content: xss(commentObject.text),
    userId: xss(commentObject.userid),
    postId : req.params.post_id
  }
  Comment.create(comment)
    .then(data => {
      res.status(201).json({ message: 'Commentaire créé !' })
    })
    .catch(error => res.status(500).json({ error }));
};

//modification commentaire

exports.modifyCommentary =(req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userId = decodedToken.userId
  const id = req.params.id;
  const commentObject = req.body;
  
  const comment = {
    content : xss(commentObject.text)
  }
  Comment.findByPk(id, { include: "user" })
    .then((oldcomment) => {
      if (userId === oldcomment.user.id) {
        Comment.update(comment, { where: { id: id }})
          .then(data => {
            res.status(201).json({ message: 'Commentaire modifié !' })
          })
          .catch(error => res.status(500).json({ error }));
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

//Suppression commentaire
exports.deleteComment = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const roleId = decodedToken.roleId
  const userId = decodedToken.userId
  const id = req.params.id;
  
  //  Trouver un  commentaire
  Comment.findByPk(id, { include: "user" })
    .then((comment) => {
      // Qui peut supprimer commentaire,  administrateur ou auteur du commentaire !!!
      
      if (roleId === 2 || userId === comment.user.id) {
        
        // supprimer le commentaire
        Comment.destroy({ where: { id : id }})
          .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
          .catch(error => res.status(400).json({ error }));
        
        // Si non, on aura une erreur
      } else {
        res.status(401).json({
          error: new Error ('requête invalide!')
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