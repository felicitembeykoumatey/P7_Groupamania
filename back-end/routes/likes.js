//Exiger les dépendances et chargé les fichiers
//Variables/ constances
const express = require("express"); // chargé librairie express
const router = express.Router(); // router
const likesCtrollers = require("../controllers/likesCtlr"); //Chargé le fichier controllers.
const multer = require("../middleware/multer-config"); // Charger package multer  pour la  gestion des fichiers ( images des différents formats)
const auth = require("../middleware/auth"); // authentification
//Mes routes
router.post("/posts/likes", auth, multer, likesCtrollers.addLike);
router.get("/posts/likes", multer, likesCtrollers.findAllLikes);

module.exports = router;
