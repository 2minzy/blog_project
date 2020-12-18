const asyncHandler = require('express-async-handler');
const Comment = require('../models/commentModel');

// @desc    Create a comment
// @route   POST /api/comments
// @access  Public
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
// @access  Public
const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({});
  if (comments) {
    res.json(comments);
  } else {
    res.status(404).json({ message: 'Comments not found' });
  }
});

// @desc    Fetch single comment
// @route   GET /api/comments/:id
// @access  Public
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
// @access  Public
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
// @access  Public
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
