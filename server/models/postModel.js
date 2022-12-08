'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const addPost = async (post) => {
  console.log('postModel: addPost', post);
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO post (userid, description, type, title, location, areamarker, mediafilename) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [post.userid, post.description, post.type, post.title, post.location, post.areamarker, post.file.filename]
    );
    return rows.insertId;
  } catch (error) {
    console.error('model addPost', error.message);
  }
};

// sql command to get posts with relations
const getPostsSql = `
    SELECT post.id, user.employeeid as user, description, post.title, location, poststate.id as stateid, 
    poststate.title as state, posttype.title as type, posttype.id as typeid,created_date, closed_date, areamarker, mediafilename 
    FROM post
    INNER JOIN user ON userid = user.id 
    INNER JOIN posttype ON type = posttype.id
    INNER JOIN poststate ON state = poststate.id
`;

// fetch all posts
const getAllPosts = async () => {
  try {
    const [rows] = await promisePool.execute(getPostsSql);
    console.log('postModel getAllPosts: ', rows);
    return rows;
  } catch (e) {
    console.error('testModel:', e.message);
  }
};

// get posts by specific id
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

// get posts by specific type
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
    console.log('postModel getPostsByState: ', rows);
    return rows;
  } catch (error) {
    console.error('getPostsByState', error.message);
  }
};

// add VET to a post
const closePost = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      `UPDATE post SET closed_date = CURRENT_TIMESTAMP, state = 2 WHERE id = ?`,
      [id]
    );
    return rows.affectedRows === 1;
  } catch (error) {
    console.error('postModel closePost', error.message);
  }
};

// modify post state, add VET if type 2 (closed)
const modifyPostState = async (post) => {
  let sql = `UPDATE post SET state = ?, closed_date = NULL WHERE id = ?`;
  if (post.state === '2') {
    sql = `UPDATE post SET state = ?, closed_date = CURRENT_TIMESTAMP WHERE id = ?`;
  }
  try {
    const [rows] = await promisePool.execute(sql, [post.state, post.id]);
    return rows.affectedRows === 1;
  } catch (error) {
    console.error('postModel modifyPostState', error.message);
  }
};

const modifyPost = async (post) => {
  try {
    console.log('postModel: modifyPost ', post);
    const [rows] = await promisePool.execute(
      `UPDATE post SET title = ?, description = ?, location = ?, type = ?, areamarker = ? WHERE id = ?`,
      [
        post.title,
        post.description,
        post.location,
        post.type,
        post.areamarker,
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
  modifyPostState,
  modifyPost,
  getPostById,
  getPostsByType,
  getPostsByUser,
  getPostsByState,
};
