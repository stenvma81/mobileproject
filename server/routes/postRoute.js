'use strict';

const express = require('express');
const { body } = require('express-validator');
const { post_post, posts_get } = require('../controllers/postController');
const router = express.Router();

router.route('/').get(posts_get);

router.post('/', post_post);

module.exports = router;
