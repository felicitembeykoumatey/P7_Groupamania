//Exiger les dépendances et chargé les fichiers
//Variables/ constances
const express = require("express"); // chargé librairie express
const router = express.Router(); // router 
const auth = require('../middleware/auth'); // authentification
const multer = require("../middleware/multer-config"); // chargé package multer  pour la  gestion des fichiers ( images des différents formats)
const likesCtrollers = require('../controllers/likesCtlr');//Chargé le fichier controllers.


//Mes routes
router.get('/', likesCtrollers.findAllLikes);
router.post('/', likesCtrollers.addLike);

module.exports = router;