const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');

router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getOneUserParam);
router.put('/user/:id', auth, multer, userCtrl.modifyParam);
router.put('/password/:id', auth, userCtrl.modifyPassword);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;