'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const addPost = async (post) => {
  console.log("postModel: addPost", post)
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

const getPostsSql = `
    SELECT post.id, user.employeeid as user, description, post.title, location, poststate.title as state, posttype.title as type, created_date, closed_date 
    FROM post
    INNER JOIN user ON userid = user.id 
    INNER JOIN posttype ON type = posttype.id
    INNER JOIN poststate ON state = poststate.id
`;

const getAllPosts = async () => {
  try {
    const [rows] = await promisePool.execute(getPostsSql);
    console.log('postModel getAllPosts: ', rows);
    return rows;
  } catch (e) {
    console.error('testModel:', e.message);
  }
};

const getPostById = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      `${getPostsSql} WHERE post.id = ?`,
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error('getPostById', error.message);
  }
};

const getPostsByType = async (typeid) => {
  try {
    const [rows] = await promisePool.execute(
      `${getPostsSql} WHERE post.type = ?`,
      [typeid]
    );
    return rows;
  } catch (error) {
    console.error('getPostsByType', error.message);
  }
};

const getPostsByUser = async (userid) => {
  try {
    const [rows] = await promisePool.execute(
      `${getPostsSql} WHERE post.userid = ?`,
      [userid]
    );
    return rows;
  } catch (error) {
    console.error('getPostsByUser', error.message);
  }
};

const getPostsByState = async (stateid) => {
  try {
    const [rows] = await promisePool.execute(
      `${getPostsSql} WHERE post.state = ?`,
      [stateid]
    );
    return rows;
  } catch (error) {
    console.error('getPostsByState', error.message);
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
    console.log("postModel: modifyPost ", post);
    const [rows] = await promisePool.execute(
      `UPDATE post SET title = ?, description = ?, location = ?, type = ?, state = ? WHERE id = ?`,
      [
        post.title,
        post.description,
        post.location,
        post.type,
        post.state,
        post.id,
      ]
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
  getPostsByType,
  getPostsByUser,
  getPostsByState,
};
