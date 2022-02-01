const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Controllers 
const settingCtrl = require('../controllers/setting');

router.get('/', auth, settingCtrl.getAllUsers);
router.get('/:id', auth, settingCtrl.getOneUserSetting);
router.put('/user/:id', auth, multer, settingCtrl.modifySetting);
router.put('/password/:id', auth,settingCtrl.modifySetting);
router.delete('/:id', auth, settingCtrl.deleteUser);

module.exports = router;