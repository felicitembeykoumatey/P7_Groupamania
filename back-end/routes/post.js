//Exiger les dépendances et chargé les fichiers
//Variables/ constances
const express = require("express"); // chargé librairie express
const router = express.Router(); // router 
const auth = require('../middleware/auth'); // authentification
const multer = require("../middleware/multer-config"); // chargé package multer  pour la  gestion des fichiers ( images des différents formats)
const postCtrollers = require('../controllers/postCtlr');//Chargé le fichier controllers 

// Création des routes  GET POST PUT DELETE

//Création d'un post
router.post('/', auth, multer, postCtrollers.createPost);
//Récupérer Tous les posts 
router.get('/', auth, postCtrollers.getAllPost);
//Récupérer un post par id d'un utilisateur
router.get('/:id', auth, postCtrollers.getOnePost);
//Récupérer Tous les posts d'un utilisateur
router.get('/user/:userId', auth, postCtrollers.getAllPostFromOneUser);
//Modifier post
router.put('/:id', auth, multer, postCtrollers.modifyPost);
//Supprimer post
router.delete('/:id', auth, postCtrollers.deletePost);

module.exports = router;
