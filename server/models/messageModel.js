'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getMessagesByPost = async (postid) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT message.id, text, created_date, postid, user.employeeid as user, message.userid FROM message
      INNER JOIN user ON userid = user.id WHERE postid = ?`,
      [postid]
    );
    // console.log('messageModel: getMessagesByPost ', rows);
    return rows;
  } catch (error) {
    console.error('getMessagesByPost', error.message);
  }
};

const addMessage = async (message) => {
  try {
    console.log(
      `messageModel: addMessage called userid: ${message.userid}, postid: ${message.postid}, text: ${message.text}`
    );
    const [rows] = await promisePool.execute(
      `INSERT INTO message(userid, postid, text) VALUES (?, ?, ?)`,
      [message.userid, message.postid, message.text]
    );
    // console.log('messageModel: addMessage ', rows.insertId);
    return rows.insertId;
  } catch (error) {
    console.error('addMessage', error.message);
  }
};

const modifyMessage = async (message) => {
  try {
    const [rows] = await promisePool.execute(
      `UPDATE message SET text = ? WHERE id = ?`,
      [message.text, message.id]
    );
    return rows.affectedRows === 1;
  } catch (error) {
    console.error('model: modifyMessage', error.message);
  }
};

const closeMessage = async (messageid) => {
  try {
    const [rows] = await promisePool.execute(
      `UPDATE message SET closed_date = CURRENT_TIMESTAMP WHERE id = ?`,
      [messageid]
    );
    return rows.affectedRows === 1;
  } catch (error) {
    console.error('closeMessage', error.message);
  }
};

const getViewedMessages = async (userid, postid) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT DISTINCT message_user_viewed.userid, messageid FROM message_user_viewed 
      INNER JOIN message ON messageid = message.id
      WHERE message_user_viewed.userid = ? AND message.postid = ?`,
      [userid, postid]
    );
    return rows;
  } catch (error) {
    console.error('getViewedMessages', error.message);
  }
};

const addToViewedMessages = async (userid, messageid) => {
  try {
    await promisePool.execute(
      `DELETE FROM message_user_viewed WHERE userid = ? AND messageid = ?`,
      [userid, messageid]
    );
    const [rows] = await promisePool.execute(
      `INSERT INTO message_user_viewed(userid, messageid) VALUES (?, ?)`,
      [userid, messageid]
    );
    return rows.insertId;
  } catch (error) {
    console.error('addToViewedMessages', error.message);
  }
};

module.exports = {
  getMessagesByPost,
  addMessage,
  modifyMessage,
  closeMessage,
  getViewedMessages,
  addToViewedMessages,
};
