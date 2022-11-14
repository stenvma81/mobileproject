'use strict';

const express = require('express');
const { body } = require('express-validator');
const {
  post_post,
  posts_get,
  post_close,
} = require('../controllers/postController');
const router = express.Router();

router.route('/').get(posts_get).post(post_post);

router.route('/close/:id').put(post_close);

module.exports = router;
