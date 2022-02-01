const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Chargé fichier commentary du dossier controllers
const commentaryCtrl = require('../controllers/commentary');

// Création des routes GET POST PUT DELETE

router.get('/:id', auth, commentaryCtrl.getOneCommentary);
router.post('/:post_id', auth, commentaryCtrl.createCommentary);
router.put('/:id', auth, commentaryCtrl.modifyCommentary);
router.delete('/:id', auth, commentaryCtrl.deleteCommentary);

module.exports = router;