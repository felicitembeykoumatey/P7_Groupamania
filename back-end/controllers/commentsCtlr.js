const xss = require('xss')
const jwt = require('jsonwebtoken');
// Importation pour utilisation des variables d'environnements.
const dotenv = require("dotenv");
// Importation pour utilisation des variables d'environnements.
require("dotenv").config(); //Cacher les mots de passe des utilisateurs.
const db = require('../models/database');
const Comment = db.comments;
const User = db.users;

//Créer un commentaire
exports.create =  (req, res,next) =>{
    const comment = {
        userId : req.body.userId,
        postId: req.body.postId,
      content: req.body.content
    }
    
 Comment.create(comment)
 .then(() => res.status(201).json({ message: "Commentaire ajouté !" }))
    .catch(error => res.status(400).json({ error }))

}


// Un seul commentaire affiché

exports.findOne = (req, res, next) => {
    Comment.findOne({ 
        where: { 
            id: req.params.id 
        },
        include: {
            model: User,
            required: true,
            attributes: ["userName"]
        }
    })
    .then(comment => { res.status(200).json(comment) })// Succès
    .catch(error => res.status(404).json({ error : error.message }))// Gestion d'erreur
}


// Modifier un commentaire
exports.modify= (req, res, next) => { 
    Comment.update({ ...req.body }, { where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: "Commentaire modifié !" }))
    .catch(error => res.status(400).json({ error: error.message }))
  }

// Supprimer un commentaire
exports.delete = (req, res, next) => {
  Comment.destroy({ where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
        .catch(error => res.status(400).json({ error : error.message}))
}