'use strict';

const {
  addPost,
  getAllPosts,
  closePost,
  modifyPost,
  getPostById,
  getPostsByType,
  getPostsByUser,
  getPostsByState,
} = require('../models/postModel');
const { httpError } = require('../utils/errors');

const post_post = async (req, res) => {
  const post = req.body;
  const id = await addPost(post);
  res.json({ message: `Post created with id: ${id}` });
};

const posts_get = async (req, res, next) => {
  const posts = await getAllPosts();
  if (posts.length > 0) {
    res.json(posts);
    return;
  }
  next(httpError('Posts not found', 404));
};

const post_get_by_id = async (req, res, next) => {
  const id = req.params.id;
  const post = await getPostById(id);
  if (post) {
    res.json(post);
    return;
  }
  next(httpError('Post not found', 404));
};

const posts_get_by_type = async (req, res, next) => {
  const typeid = req.params.id;
  const posts = await getPostsByType(typeid);
  if (posts.length > 0) {
    res.json(posts);
    return;
  }
  next(httpError('Posts not found', 404));
};

const posts_get_by_user = async (req, res, next) => {
  const userid = req.params.id;
  const posts = await getPostsByUser(userid);
  if (posts.length > 0) {
    res.json(posts);
    return;
  }
  next(httpError('Posts not found', 404));
};

const posts_get_by_state = async (req, res, next) => {
  const stateid = req.params.id;
  const posts = await getPostsByState(stateid);
  if (posts.length > 0) {
    res.json(posts);
    return;
  }
  next(httpError('Posts not found', 404));
};

const post_close = async (req, res) => {
  try {
    const id = req.params.id;
    const postClosed = await closePost(id);
    res.json({ message: `Post closed: ${postClosed}` });
  } catch (error) {
    console.error(`postController: ${error.message}`);
  }
};

const post_modify = async (req, res) => {
  try {
    const post = req.body;
    post.id = req.params.id;
    const modified = await modifyPost(post);
    res.json({ message: `Post modified: ${modified}` });
  } catch (error) {
    console.error('postController post_modify', error.message);
  }
};

module.exports = {
  post_post,
  posts_get,
  post_close,
  post_modify,
  post_get_by_id,
  posts_get_by_type,
  posts_get_by_user,
  posts_get_by_state,
};
