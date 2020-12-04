const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');

// @desc    Create a post
// @route   POST /api/posts
// @access  admin
const createPost = asyncHandler(async (req, res) => {
  const { title, body } = req.body;

  const post = new Post({
    title,
    body,
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

// @desc    Fetch all prosts
// @route   GET /api/posts
// @access  admin
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({});

  res.json(posts);
});

// @desc    Fetch single post
// @route   GET /api/posts/.id
// @access  admin
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Post not Found');
  }
});

// @desc    Delete a post
// @route   DELETE /api/products/:id
// @access  admin
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    await post.remove();
    res.json({ message: 'Post removed successfully' });
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// @desc    Update a post
// @route   UPDATE /api/products/:id
// @access  admin
const updatePost = asyncHandler(async (req, res) => {
  const { title, body } = req.body;

  const post = await Post.findById(req.params.id);

  if (post) {
    post.title = title;
    post.body = body;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

module.exports = { createPost, getPosts, getPostById, deletePost, updatePost };
