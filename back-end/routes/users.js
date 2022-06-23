//Importation express pour créer le routeur//
const express = require("express");
//Création du routeur/
const router = express.Router();
const multer = require("../middleware/multer-config"); // Charger package multer  pour la  gestion des fichiers ( images des différents formats)

//Chargé le fichier controllers
const userCtrl = require("../controllers/usersCtlr"); // Réécupérer le controleur pour "user"
//Création des routes  inscription et connexion //
router.post("/signup", userCtrl.signup); // Inscription//
router.post("/login", multer, userCtrl.login); // Connexion//
router.get("/me", multer, userCtrl.profilUser); // profil d'utilisateur//
router.get("/all", multer, userCtrl.allProfilUser); // Afficher tous les profils
router.get("/updateUser/:id", multer, userCtrl.profilUserById); // Récuperer des informations d'un utilisateur par id
router.get("/one/:id", multer, userCtrl.oneProfilUser); // Afficher un profil
router.put("/updateRole", multer, userCtrl.updateUserRole); //modification role  par l'administrateur
//modification profile par l'utilisateur courant
router.put("/updateByUser", multer, userCtrl.modifyUser);
// Rénitialiser le  mot de passe par l'administrateur
router.put("/modifyPassword", multer, userCtrl.modifyPassword);
//Modification du mot de passe par l'utilisateur courant
router.put("/editPassword", multer, userCtrl.editPassword);
//Suppression profile
router.delete("/delete/:id", multer, userCtrl.deleteProfil);
//**EXPORT//
module.exports = router;
