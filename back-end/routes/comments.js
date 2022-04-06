//Exiger les dépendances et chargé les fichiers
//Variables/ constances
const express = require("express"); // chargé librairie express
const router = express.Router(); // router 
const auth = require('../middleware/auth'); // authentification
//const multer = require("../middleware/multer-config"); // chargé package multer  pour la  gestion des fichiers ( images des différents formats)
const commentCtrollers = require('../controllers/commentsCtlr');//Chargé le fichier controllers.
const multer = require("../middleware/multer-config"); // Charger package multer  pour la  gestion des fichiers ( images des différents formats)


//Mes routes
router.post ("/comments", multer,commentCtrollers.createComment);  // chemin pour créer un commentaire.
router.get("/comments", auth, commentCtrollers.getAllComment) // chemin pour obtenir un commentaire.
router.put("/:id", auth,commentCtrollers.modify) // modifier commentaire.
router.delete("comments/:id", auth, commentCtrollers.delete); // chemin pour supprimer le commentaire.

module.exports = router;