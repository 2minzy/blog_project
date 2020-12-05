const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const Category = require('../models/categoryModel');

// @desc    Create a post
// @route   POST /api/posts
// @access  admin
const createPost = asyncHandler(async (req, res) => {
  try {
    const { title, body, tags = [] } = req.body;
    const newPost = { title, body, tags };

    // checking if category is exist or not
    // req.body.category = 'USA Travel' -> category = null 'usa-travel'
    let category = await Category.findOne({ slug: req.body.category });

    // req.body.category = undefined?
    if (!category && req.body.category) {
      category = await Category.create({ name: req.body.category });
    }

    if (category) {
      newPost.category = category.slug;
    }

    const createdPost = await Post.create(newPost);

    res.status(201).json(createdPost);
  } catch (error) {
    res.status(400).json({ message: "can't create post", error });
  }
});

// @desc    Fetch all prosts
// @route   GET /api/posts
// @access  admin
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({});
  if (posts) {
    res.status(200).json(posts);
  } else {
    res.status(404).json({ message: 'posts not found' });
  }
});

// @desc    Fetch single post
// @route   GET /api/posts/:id
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
