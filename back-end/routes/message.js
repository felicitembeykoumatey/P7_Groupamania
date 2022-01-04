const express = require ('express');
const router = express.Router();
const auth = require ('../middleware/auth');
const multer = require ('../middleware/multer-config');
const messageCtrl = require ('../controllers/message')

// création route

router.post('/', auth, multer, messageCtrl.createMessage);
router.get('/', auth, messageCtrl.getAllMessages);


module.exports = router;