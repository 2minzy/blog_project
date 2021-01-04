const asyncHandler = require('express-async-handler');
const { getPagination, getFilter } = require('../utils/crudHelper');
const Post = require('../models/postModel');

// @desc    Fetch all blog posts
// @route   GET /api/blog/posts
// @access  Public
const getBlogPosts = asyncHandler(async (req, res) => {
  const [skip, limit] = getPagination(req.query.page);
  const filter = getFilter(req.query.filter);

  const posts = await Post.find(filter)
    .skip(skip)
    .limit(limit)
    .populate('publisher', 'name -_id'); // -_id means remove _id
  const postCount = await Post.countDocuments(filter);

  const pages = Math.ceil(postCount / limit);

  if (posts) {
    res.status(200).json({ posts, pages });
  } else {
    res.status(404).json({ message: 'posts not found' });
  }
});

// @desc    Fetch single blog post
// @route   GET /api/blog/posts/:slug
// @access  Public
const getPostBySlug = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.slug);

  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: 'post not found' });
  }
});

// @desc    Create a comment
// @route   POST /api/blog/posts/:slug/comments
// @access  Public
// const createBlogComment = asyncHandler(async (req, res) => {
//   try {
//     const createdComment = await Comment.create({ ...req.body });
//     res.status(201).json(createdComment);
//   } catch (error) {
//     res.status(400).json({ message: "Can't create comment", error });
//   }
// });

// @desc    Fetch all comments
// @route   GET /api/blog/posts/:slug/comments
// @access  Public
// const getBlogComments = asyncHandler(async (req, res) => {
//   const [start, end, limit] = getRange(req.query.range);
//   const filter = getFilter(req.query.filter);
//   const comments = await Comment.find(filter).skip(start).limit(limit);
//   const commentsCount = await Comment.countDocuments(filter);

//   if (comments) {
//     res.set('Content-Range', `posts ${start}-${end}/${commentsCount}`);
//     res.json(comments);
//   } else {
//     res.status(404).json({ message: 'Comments not found' });
//   }
// });

module.exports = {
  getBlogPosts,
  getPostBySlug,
};
