'use strict';
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.post('/login', authController.login);

router.get('/logout', authController.logout);

module.exports = router;