//Importation express pour créer le routeur//
const express = require ('express');
//Création du routeur//
const router = express.Router();
// middeleware limiter //
const limiter = require('../middleware/limiter');
// controllers user//
const userCtrl = require("../controllers/user");

//Création des routes  inscription et connexion //
router.post('/signup', limiter, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;