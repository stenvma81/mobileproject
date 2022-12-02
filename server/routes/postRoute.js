'use strict';

const express = require('express');
const multer = require('multer');
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
  post_modify_state,
  make_thumbnail,
} = require('../controllers/postController');
const router = express.Router();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/gif') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const testFile = (req, res, next) => {
  if (req.file) {
    next();
  } else {
    res.status(400).json({errors: 'file is not image'});
  }
};

const upload = multer({dest: 'uploads/', fileFilter});

router.route('/').get(posts_get);
router.post('/', upload.single('media'), testFile, make_thumbnail, post_post);

router.route('/:id').get(post_get_by_id).put(post_modify);

router.route('/close/:id').put(post_close);

router.route('/user/:id').get(posts_get_by_user);

router.route('/type/:id').get(posts_get_by_type);

router.route('/state/:id').get(posts_get_by_state).put(post_modify_state);

module.exports = router;
