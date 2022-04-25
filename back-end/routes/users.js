//Importation express pour créer le routeur//
const express = require("express");
//Création du routeur//
const router = express.Router();
const multer = require("../middleware/multer-config"); // Charger package multer  pour la  gestion des fichiers ( images des différents formats)
const limiter = require("../middleware/limiter"); // middeleware limiter //
//Chargé le fichier controllers
const userCtrl = require("../controllers/usersCtlr"); // Réécupérer le controleur pour "user"
const auth = require("../middleware/auth"); // Importer la fonction qui permet de vérifier les tokens et sécuriser les différentes routes

//Création des routes  inscription et connexion //
router.post("/signup", multer, limiter, userCtrl.signup); // Inscription//
router.post("/login", multer, userCtrl.login); // Connexion//
router.get("/me", multer, userCtrl.profilUser); // profil d'utilisateur//
router.get("/all", multer, userCtrl.allProfilUser); // Afficher tous les profils
router.delete("/delete/:id", multer, userCtrl.deleteProfil); //Suppression profile
router.put("/update", multer, userCtrl.updateUserRole); //modification profile par l'administrateur
router.put("/updateUser/:id", multer, userCtrl.updateUser); //modification profile par l'utilisateur courant
//**EXPORT**/
module.exports = router;
