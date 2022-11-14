const { addPost, getAllPosts } = require('../models/postModel');

const post_post = async (req, res) => {
  try {
    const post = req.body;
    const id = await addPost(post);
    res.json({ message: `Post created with id: ${id}`, id: id });
  } catch (error) {
    console.error('controller postPost', error.message);
  }
};

const posts_get = async (req, res) => {
  console.log('Fetching test posts');
  try {
    console.log('get all posts from controller', req.query);
    const testPosts = await getAllPosts();
    res.json(testPosts);
    return;
  } catch (e) {
    console.error('testController', e.message);
  }
};

module.exports = {
  post_post,
  posts_get,
};
