'use strict';

const {
  addPost,
  getAllPosts,
  closePost,
  modifyPost,
  getPostById,
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

const post_close = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await closePost(id);
    if (post) {
      res.json({ message: `Post closed` });
    }
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
};
