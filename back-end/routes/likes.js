//Exiger les dépendances et chargé les fichiers
//Variables/ constances
const express = require("express"); // chargé librairie express
const router = express.Router(); // router
const likesCtrollers = require("../controllers/likesCtlr"); //Chargé le fichier controllers.
const multer = require("../middleware/multer-config"); // Charger package multer  pour la  gestion des fichiers ( images des différents formats)

//Mes routes
router.get("/likes", multer, likesCtrollers.findAllLikes);
router.post("/likes", multer, likesCtrollers.addLike);

module.exports = router;
