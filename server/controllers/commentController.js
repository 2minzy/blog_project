const asyncHandler = require('express-async-handler');
const Comment = require('../models/commentModel');
const { getRange, getFilter } = require('../utils/crudHelper');

// @desc    Create a comment
// @route   POST /api/comments
// @access  Admin
const createComment = asyncHandler(async (req, res) => {
  try {
    const createdComment = await Comment.create({ ...req.body });
    res.status(201).json(createdComment);
  } catch (error) {
    res.status(400).json({ message: "Can't create comment", error });
  }
});

// @desc    Fetch all comments
// @route   GET /api/comments
// @access  Admin
const getComments = asyncHandler(async (req, res) => {
  const [start, end, limit] = getRange(req.query.range);
  const filter = getFilter(req.query.filter);
  const comments = await Comment.find(filter).skip(start).limit(limit);
  const commentsCount = await Comment.countDocuments(filter);

  if (comments) {
    res.set('Content-Range', `posts ${start}-${end}/${commentsCount}`);
    res.json(comments);
  } else {
    res.status(404).json({ message: 'Comments not found' });
  }
});

// @desc    Fetch single comment
// @route   GET /api/comments/:id
// @access  Admin
const getCommentById = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

// @desc    Update a comment
// @route   UPDATE /api/comments/:id
// @access  Admin
const updateComment = asyncHandler(async (req, res) => {
  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    { new: true }
  );

  if (updatedComment) {
    res.status(200).json(updatedComment);
  } else {
    res.status(400).json({ message: "can't update comment" });
  }
});

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Admin
const deleteComment = asyncHandler(async (req, res) => {
  const deletedComment = await Comment.findByIdAndDelete(req.params.id);

  if (deletedComment) {
    res.json(deletedComment);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

module.exports = {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
};
