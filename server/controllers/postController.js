const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');

// @desc    Create a post
// @route   POST /api/posts
// @access  admin
const createPost = asyncHandler(async (req, res, next) => {
  try {
    const { title, body } = req.body;
    // For slug
    // const { name, slug } = req.body;
    // if (slug === '') {
    //   slug = name.toLowerCase().replace(' ','-')
    // }
    const createdPost = await Post.create({ title, body });

    res.status(201).json(createdPost);
  } catch (error) {
    res.status(400).json({ message: "can't create post", error });
  }
});

// @desc    Fetch all prosts
// @route   GET /api/posts
// @access  admin
const getPosts = asyncHandler(async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

// @desc    Fetch single post
// @route   GET /api/posts/.id
// @access  admin
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'post not found' });
  }
});

// @desc    Delete a post
// @route   DELETE /api/products/:id
// @access  admin
const deletePost = asyncHandler(async (req, res) => {
  const deletedPost = await Post.findByIdAndDelete(req.params.id);

  if (deletedPost) {
    res.json(deletedPost);
  } else {
    res.status(404).json({ message: 'post not found' });
  }
});

// @desc    Update a post
// @route   UPDATE /api/products/:id
// @access  admin
const updatePost = asyncHandler(async (req, res) => {
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    { new: true }
  );

  if (updatedPost) {
    res.status(200).json(updatedPost);
  } else {
    res.status(404).json({ message: "can't update post" });
  }
});

module.exports = { createPost, getPosts, getPostById, deletePost, updatePost };
