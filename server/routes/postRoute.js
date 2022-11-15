'use strict';

const express = require('express');
const { body } = require('express-validator');
const {
  post_post,
  posts_get,
  post_close,
  post_modify,
  post_get_by_id,
} = require('../controllers/postController');
const router = express.Router();

router.route('/').get(posts_get).post(post_post);

router.route('/:id').get(post_get_by_id).put(post_modify);

router.route('/close/:id').put(post_close);

module.exports = router;
