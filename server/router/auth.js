const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const verifyAuth = require('../middlewares/jwtMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/update', verifyAuth, authController.update);

module.exports = router;
