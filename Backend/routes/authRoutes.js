const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const authController = require('../controllers/authController');

router.post('/signup', upload.single('profile'), authController.signup);
router.post('/signin', authController.signin);
router.get('/profile', auth, authController.getProfile);

module.exports = router;
