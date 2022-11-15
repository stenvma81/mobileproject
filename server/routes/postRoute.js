'use strict';

const express = require('express');
const { body } = require('express-validator');
const {
  post_post,
  posts_get,
  post_close,
  post_modify,
  post_get_by_id,
  posts_get_by_type,
} = require('../controllers/postController');
const router = express.Router();

router.route('/').get(posts_get).post(post_post);

router.route('/:id').get(post_get_by_id).put(post_modify);

router.route('/close/:id').put(post_close);

// router.route('/user/id').get(posts_get).post(post_post);

router.route('/type/:id').get(posts_get_by_type);

// router.route('/state').get(posts_get).post(post_post);

module.exports = router;
