'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getMessagesByPost = async (postid) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT * FROM message WHERE postid = ?`,
      [postid]
    );
    console.log(`id: ${postid} size: ${rows.length}`);
    return rows;
  } catch (error) {
    console.error('getMessagesByPost', error.message);
  }
};

const addMessage = async (message) => {
  try {
    const [rows] = await promisePool.execute(
      `INSERT INTO message(postid, text) VALUES (?, ?)`,
      [message.postid, message.text]
    );
    return rows.insertId;
  } catch (error) {
    console.error('addMessage', error.message);
  }
};

module.exports = { getMessagesByPost, addMessage };
