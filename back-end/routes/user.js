//Importation express pour créer le routeur//
const express = require ('express');
//Création du routeur//
const router = express.Router();
//authentification //
//const auth = require ('../middleware/auth');
// middeleware limiter //
const limiter = require ('../middleware/limiter');
// controllers user//
const userCtrl = require ('../controllers/user');// Réécupérer le controleur pour "user"

/**ROUTES**/
//Création des routes  inscription et connexion //

router.post('/signup', limiter, userCtrl.signup);// Inscription//
router.post('/login', limiter, userCtrl.login); // Connexion//
//router.delete('/:id', auth, userCtrl.deleteAccount);
//router.get('/:id', auth, userCtrl.getOneAccount);
//router.put('/:id', auth, userCtrl.modifyAccount);
//router.get('/accounts', userCtrl.getAllAccounts);

//**EXPORT**/
module.exports = router;