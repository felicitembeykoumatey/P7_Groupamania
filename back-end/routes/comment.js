//Exiger les dépendances et chargé les fichiers
//Variables/ constances
const express = require("express"); // chargé librairie express
const router = express.Router(); // router 
const auth = require('../middleware/auth'); // authentification
const multer = require("../middleware/multer-config"); // chargé package multer  pour la  gestion des fichiers ( images des différents formats)
const commentCtrollers = require('../controllers/commentCtlr');//Chargé le fichier controllers.


//Mes routes
router.post ("/comment", auth, commentCtrollers.create);  // chemin pour créer un commentaire.
//router.get("/", auth, commentCtrollers.findAll); // chemin pour obtenir tous les commentaires.
router.get("/", auth, commentCtrollers.findOne) // chemin pour obtenir un commentaire.
router.put("/:id", commentCtrollers.modify) // modifier commentaire.
router.delete("/:commentId/:postId", auth, commentCtrollers.delete); // chemin pour supprimer le commentaire.

module.exports = router;