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
  posts_get_by_user,
  posts_get_by_state,
} = require('../controllers/postController');
const router = express.Router();

router.route('/').get(posts_get);
router.post('/', post_post);

router.route('/:id').get(post_get_by_id).put(post_modify);

router.route('/close/:id').put(post_close);

router.route('/user/:id').get(posts_get_by_user);

router.route('/type/:id').get(posts_get_by_type);

router.route('/state/:id').get(posts_get_by_state);

router.post('/',
    upload.single('media'),
    testFile,
    mediaController.make_thumbnail,
    body('description').isLength({min: 3}).blacklist(';'),
    mediaController.mediaPost_create);

module.exports = router;
