//Exiger les dépendances et chargé les fichiers
//Variables/ constances
const express = require("express"); // chargé librairie express
const router = express.Router(); // router
const auth = require("../middleware/auth"); // authentification
const multer = require("../middleware/multer-config"); // Charger package multer  pour la  gestion des fichiers ( images des différents formats)
const commentCtrollers = require("../controllers/commentsCtlr"); //Chargé le fichier controllers.
//Mes routes
router.post("/comments", multer, commentCtrollers.createComment); //  créer un commentaire.
router.get("/comments", auth, commentCtrollers.getAllComment); // obtenir un commentaire.
router.delete("/comments/:id", multer, commentCtrollers.delete); // supprimer le commentaire.
router.get("/countComments/:id", commentCtrollers.getAllCountComment); // Compter les commentaires

module.exports = router;
