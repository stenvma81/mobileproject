'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getMessagesByPost = async (postid) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT * FROM message WHERE postid = ?`,
      [postid]
    );
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
    return rows.insertId;
  } catch (error) {
    console.error('addMessage', error.message);
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

module.exports = { getMessagesByPost, addMessage, closeMessage };
