//Exiger les dépendances et charger les fichiers

const express = require("express"); // Charger librairie express
const router = express.Router(); // //Enregistrer les routes dans notre routeur Express, puis enregistrer celui-ci dans l'application.
const auth = require("../middleware/auth"); // fonction qui permet de vérifier les tokens et sécuriser les différentes routes.
const multer = require("../middleware/multer-config"); // Charger package multer  pour la  gestion des fichiers ( images des différents formats)
const postCtrollers = require("../controllers/postsCtlr"); //Charger fichier controllers

//Méthode CRUD (création, lecture, modification, suppression)
router.post("/posts", multer, postCtrollers.createPost); // création post
//router.get("/posts", auth, postCtrollers.getAllPosts);
router.get("/posts", postCtrollers.getAllPosts);
router.get("/:id", auth, postCtrollers.getAllPostFromOneUser);
router.get("/:id", auth, postCtrollers.getOnePost);
router.put("/:id", auth, multer, postCtrollers.modifyPost);
router.delete("/:id", auth, postCtrollers.deletePost);
module.exports = router;
