//Exiger les dépendances et charger les fichiers

const express = require("express"); // Charger librairie express
const router = express.Router(); // //Enregistrer les routes dans notre routeur Express, puis enregistrer celui-ci dans l'application.
const auth = require("../middleware/auth"); // fonction qui permet de vérifier les tokens et sécuriser les différentes routes.
const multer = require("../middleware/multer-config"); // Charger package multer  pour la  gestion des fichiers ( images des différents formats)
const postCtrollers = require("../controllers/postsCtlr"); //Charger fichier controllers

router.post("/posts", multer, postCtrollers.createPost); // création post
router.get("/posts", postCtrollers.getAllPosts);
router.get("/:id", auth, postCtrollers.getAllPostFromOneUser);
router.delete("/posts/:id", multer, postCtrollers.deletePost);
router.post("/posts/like", multer, postCtrollers.likePost); // création post
router.post("/posts/unlike", multer, postCtrollers.unlikePost); // création post
router.get("/:postId/likes", postCtrollers.getAllLikesPost);
module.exports = router;
