
//Déclaration des constances

//express
const express = require('express');
const router = express.Router();

//Authentification /autorisation, commenter
const auth = require ('../middleware/auth');
const commentCtrl = require ('../controllers/comment');

//Importation des routes par la méthode get, post, put, delete

router.get('/: id', auth, commentCtrl.getOneComment);
router.post('/:post_id', auth, commentCtrl.createComment);
router.put('/:id', auth, commentCtrl.modifyComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;

