'use strict';

const {
  getMessagesByPost,
  addMessage,
  closeMessage,
  modifyMessage,
  getViewedMessages,
} = require('../models/messageModel');
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

const message_modify = async (req, res) => {
  const messageid = req.params.id;
  const message = req.body;
  message.id = messageid;
  const messageModified = await modifyMessage(message);
  res.json({ message: `Message modified: ${messageModified}` });
};

const message_close = async (req, res) => {
  const messageid = req.params.id;
  const messageClosed = await closeMessage(messageid);
  res.json({ message: `Message closed: ${messageClosed}` });
};

const message_get_viewed = async (req, res) => {
  const postid = req.params.postid;
  const userid = req.params.userid;
  const data = await getViewedMessages(userid, postid);
  if (data.length > 0) {
    res.json(data);
    return;
  }
  next(httpError('Viewed messages not found', 404));
};

module.exports = {
  messages_get_by_post,
  message_add,
  message_modify,
  message_close,
  message_get_viewed,
};
