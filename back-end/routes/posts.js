//Exiger les dépendances et charger les fichiers
const express = require("express"); // Charger librairie express
const router = express.Router(); // //Enregistrer les routes dans notre routeur Express, puis enregistrer celui-ci dans l'application.
const multer = require("../middleware/multer-config"); // Charger package multer  pour la  gestion des fichiers ( images des différents formats)
const postCtrollers = require("../controllers/postsCtlr"); //Charger fichier controllers

// Les chemins
router.post("/posts", multer, postCtrollers.createPost); // création post
router.get("/allposts", multer, postCtrollers.getAllPosts); // obtenir Tous les posts
router.post("/posts/like", multer, postCtrollers.likePost); // création like d'un post
router.get("/likes/:postId", multer, postCtrollers.getAllLikesPost); // obtenir likes des posts
router.delete("/posts/:id", multer, postCtrollers.deletePost); // supprimer publication
module.exports = router;
