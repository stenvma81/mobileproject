'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const addPost = async (post) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO post (userid, description, type, title, location) VALUES (?, ?, ?, ?, ?)',
      [post.userid, post.description, post.type, post.title, post.location]
    );
    return rows.insertid;
  } catch (error) {
    console.error('model addPost', error.message);
  }
};

const getAllPosts = async () => {
  try {
    const [rows] = await promisePool.execute(`SELECT * FROM post`);
    console.log('postModel getAllPosts: ', rows);
    return rows;
  } catch (e) {
    console.error('testModel:', e.message);
  }
};

const closePost = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      `UPDATE post SET closed_date = CURRENT_TIMESTAMP WHERE id = ?`,
      [id]
    );
    return rows.affectedRows === 1;
  } catch (error) {
    console.error('postModel closePost', error.message);
  }
};

module.exports = {
  addPost,
  getAllPosts,
  closePost,
};
