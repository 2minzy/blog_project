const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const Category = require('../models/categoryModel');
const { paginate, getFilter } = require('../utils/crudHelper');
const { toSlug } = require('../utils/slug');

// @desc    Create a post
// @route   POST /api/posts
// @access  Admin
const createPost = asyncHandler(async (req, res) => {
  try {
    const { title, body, tags = [], category = 'uncategorized' } = req.body;
    const newPost = { title, body, tags };

    // checking if category is exist or not
    // req.body.category = 'USA Travel' -> category = null 'usa-travel'
    let categorySlug = await Category.findOne({ slug: toSlug(category) });

    // req.body.category = undefined?
    if (!categorySlug && category) {
      categorySlug = await Category.create({ name: category });
    }

    if (categorySlug) {
      newPost.category = categorySlug.slug;
    }

    const createdPost = await Post.create(newPost);

    res.status(201).json(createdPost);
  } catch (error) {
    res.status(400).json({ message: "can't create post", error });
  }
});

// @desc    Fetch all prosts
// @route   GET /api/posts
// @access  Admin
const getPosts = asyncHandler(async (req, res) => {
  const [start, end, limit] = paginate(req.query.range); // GET api/posts?range=[start,end]
  const filter = getFilter(req.query.filter); // GET api/posts?filter={"title": "string"}
  const posts = await Post.find(filter).skip(start).limit(limit);
  const postCount = await Post.countDocuments(filter);

  if (posts) {
    res.set('Content-Range', `posts ${start}-${end}/${postCount}`);
    res.status(200).json(posts);
  } else {
    res.status(404).json({ message: 'posts not found' });
  }
});

// @desc    Fetch single post
// @route   GET /api/posts/:id
// @access  Admin
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: 'post not found' });
  }
});

// @desc    Update a post
// @route   UPDATE /api/products/:id
// @access  Admin
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

// @desc    Delete a post
// @route   DELETE /api/products/:id
// @access  Admin
const deletePost = asyncHandler(async (req, res) => {
  const deletedPost = await Post.findByIdAndDelete(req.params.id);

  if (deletedPost) {
    res.json(deletedPost);
  } else {
    res.status(404).json({ message: 'post not found' });
  }
});

module.exports = { createPost, getPosts, getPostById, deletePost, updatePost };
