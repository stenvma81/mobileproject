'use strict';
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { body } = require('express-validator');

router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;