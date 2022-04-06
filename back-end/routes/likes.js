//Exiger les dépendances et chargé les fichiers
//Variables/ constances
const express = require("express"); // chargé librairie express
const router = express.Router(); // router 
const likesCtrollers = require('../controllers/likesCtlr');//Chargé le fichier controllers.


//Mes routes
router.get('/likes', likesCtrollers.findAllLikes);
router.post('/likes', likesCtrollers.addLike);

module.exports = router;