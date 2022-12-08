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
  modifyPostState,
} = require('../models/postModel');
const { httpError } = require('../utils/errors');
const {makeThumbnail} = require('../utils/resize');

const post_post = async (req, res) => {
  console.log('postController: post_post', req.file);
  if(req.body != {}) {
    const post = req.body;
    post.file = req.file;
    const id = await addPost(post);
    res.json({ message: `Post created with id: ${id}` });
  } else {
    console.log('post_post content error, req.body: ', req.body);
  }
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

const post_modify_state = async (req, res) => {
  const post = req.body;
  post.id = req.params.id;
  const stateModified = await modifyPostState(post);
  res.json({ message: `Post state modified: ${stateModified}` });
};

const post_modify = async (req, res) => {
  try {
    const post = req.body;
    console.log('postController: post_modify: ', post, req.params.id);
    post.id = req.params.id;
    const modified = await modifyPost(post);
    res.json({ message: `Post modified: ${modified}` });
  } catch (error) {
    console.error('postController post_modify', error.message);
  }
};

const make_thumbnail = async (req, res, next) => {
  try {
    const thumbnail = await makeThumbnail(req.file.path, req.file.filename);
    if (thumbnail) {
      console.log('make_thumbnail we get here', req.file.filename)
      next();
    }
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

module.exports = {
  post_post,
  posts_get,
  post_close,
  post_modify_state,
  post_modify,
  post_get_by_id,
  posts_get_by_type,
  posts_get_by_user,
  posts_get_by_state,
  make_thumbnail,
};
