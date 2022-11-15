'use strict';

const express = require('express');
const { body } = require('express-validator');
const {
  messages_get_by_post,
  message_add,
} = require('../controllers/messageController');
const router = express.Router();

router.route('/').post(message_add);

router.route('/post/:id').get(messages_get_by_post);

module.exports = router;
