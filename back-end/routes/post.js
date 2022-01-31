//Exiger les dépendances et chargé les fichiers
//Variables/ constances
const express = require("express"); // chargé librairie express
const router = express.Router(); // router 
const auth = require('../middleware/auth'); // authentification
const multer = require("../middleware/multer-config"); // chargé package multer  pour la  gestion des fichiers ( images des différents formats)

//Chargé le fichier controllers 
const postCtrollers = require('../controllers/post');

// Création des routes POST GET PUT DELETE///
router.post('/', auth, multer, postCtrollers.createPost);
router.get('/', auth, postCtrollers.getAllPost);
router.get('/user/:userId', auth, postCtrl.getAllPostFromOneUser);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);


module.exports = router;