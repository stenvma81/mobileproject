'use strict';

const { getMessagesByPost, addMessage } = require('../models/messageModel');
const { httpError } = require('../utils/errors');

const messages_get_by_post = async (req, res, next) => {
  const postid = req.params.id;
  const messages = await getMessagesByPost(postid);
  if (messages.length > 0) {
    res.json(messages);
    return;
  }
  next(httpError('Messages not found', 404));
};

const message_add = async (req, res) => {
  const message = req.body;
  const id = await addMessage(message);
  res.json({ message: `Message created with id: ${id}` });
};

module.exports = { messages_get_by_post, message_add };
