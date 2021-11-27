const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const paramsCtrl = require('../controllers/params');

router.get('/', auth, paramsCtrl.getAllUsers);
router.get('/:id', auth, paramsCtrl.getOneUserParams);
router.put('/user/:id', auth, multer, paramsCtrl.modifyParams);
router.put('/password/:id', auth, paramsCtrl.modifyPassword);
router.delete('/:id', auth, paramsCtrl.deleteUser);

module.exports = router;