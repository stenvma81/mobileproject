'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const addPost = async (post) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO post (userid, description, type) VALUES (?, ?, ?)',
      [post.userid, post.description, post.type]
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

module.exports = {
  addPost,
  getAllPosts,
};
