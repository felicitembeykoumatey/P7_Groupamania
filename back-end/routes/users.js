//Importation express pour créer le routeur//
const express = require ('express');
//Création du routeur//
const router = express.Router();


const limiter = require ('../middleware/limiter');// middeleware limiter //
//Chargé le fichier controllers 
const userCtrl = require ('../controllers/usersCtlr');// Réécupérer le controleur pour "user"
const auth = require("../middleware/auth"); // Importer la fonction qui permet de vérifier les tokens et sécuriser les différentes routes

/**ROUTES**/
//Création des routes  inscription et connexion //
router.post('/signup', limiter, userCtrl.signup);// Inscription//
router.post('/login', limiter, userCtrl.login); // Connexion//
router.get('/me', auth, userCtrl.userProfil);// profil d'utilisateur//
router.get('/all', auth, userCtrl.allProfiluser);// Affichage tous les profils
router.delete("/delete", auth, userCtrl.deleteProfile);
//**EXPORT**/
module.exports = router;