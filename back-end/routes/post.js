//Exiger les dépendances et chargé les fichiers
//Variables/ constances
const express = require("express"); // chargé librairie express
const router = express.Router(); // router 
const auth = require('../middleware/auth'); // authentification
const multer = require("../middleware/multer-config"); // chargé package multer  pour la  gestion des fichiers ( images des différents formats)
const postCtrollers = require('../controllers/postCtlr');//Chargé le fichier controllers 

// Création des routes  GET POST PUT DELETE

//Création d'un post (text, image, file.txt)
router.post('/', auth, multer, postCtrollers.createPost);

module.exports = router;
