//Importation express pour créer le routeur//
const express = require("express");
//Création du routeur/
const router = express.Router();
const limiter = require("../middleware/limiter");
//const auth =require ("../middleware/auth");
const multer = require("../middleware/multer-config"); // Charger package multer  pour la  gestion des fichiers ( images des différents formats)
const userCtrl = require("../controllers/usersCtlr"); // Chargé le fichier controllers
//Création des routes  inscription et connexion //
router.post("/signup", userCtrl.signup); // Inscription//
router.post("/login", limiter, multer, userCtrl.login); // Connexion//
router.get("/me", multer, userCtrl.profilUser); // profil d'utilisateur//
router.get("/all", multer, userCtrl.allProfilUser); // Afficher tous les profils
router.get("/updateUser/:id", multer, userCtrl.profilUserById); // Récuperer des informations d'un utilisateur par id
router.get("/one/:id", multer, userCtrl.oneProfilUser); // Afficher un profil
router.put("/updateRole", multer, userCtrl.updateUserRole); //modification role  par l'administrateur
router.put("/updateByUser", multer, userCtrl.modifyUserData); //modification profile par l'utilisateur courant
router.put("/updateDataByAdmin", multer, userCtrl.modifyUserDataByAdmin); //modification profile par l'utilisateur courant
router.put("/modifyPassword", multer, userCtrl.modifyPassword); // Rénitialiser le  mot de passe par l'administrateur
router.put("/editPassword", multer, userCtrl.editPassword); //Modification du mot de passe par l'utilisateur courant
router.delete("/delete/:id", multer, userCtrl.deleteProfil); //Suppression profile

module.exports = router;
