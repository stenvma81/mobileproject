'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const addPost = async (post) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO post (userid, description, type, title, location) VALUES (?, ?, ?, ?, ?)',
      [post.userid, post.description, post.type, post.title, post.location]
    );
    return rows.insertId;
  } catch (error) {
    console.error('model addPost', error.message);
  }
};

const getAllPosts = async () => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT post.id, user.employeeid as user, description, post.title, location, posttype.title as type, created_date, closed_date 
        FROM post
        INNER JOIN user ON userid = user.id 
        INNER JOIN posttype ON type = posttype.id`
    );
    console.log('postModel getAllPosts: ', rows);
    return rows;
  } catch (e) {
    console.error('testModel:', e.message);
  }
};

const getPostById = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      `
        SELECT post.id, user.employeeid as user, description, post.title, location, posttype.title as type, created_date, closed_date 
        FROM post
        INNER JOIN user ON userid = user.id 
        INNER JOIN posttype ON type = posttype.id
        WHERE post.id = ?
        `,
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error('getPostById', error.message);
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

const modifyPost = async (post) => {
  try {
    const [rows] = await promisePool.execute(
      `UPDATE post SET title = ?, description = ?, location = ?, type = ? WHERE id = ?`,
      [post.title, post.description, post.location, post.type, post.id]
    );
    return rows.affectedRows === 1;
  } catch (error) {
    console.error('postModel modifyPost', error.message);
  }
};

module.exports = {
  addPost,
  getAllPosts,
  closePost,
  modifyPost,
  getPostById,
};
