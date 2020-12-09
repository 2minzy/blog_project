const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc      Create a new user
// @route     POST /api/users
// @access    Admin
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400).json({ message: 'user already exist' });
  }

  const createdUser = await User.create({
    name,
    email,
    password,
    role,
  });

  if (createdUser) {
    res.status(201).json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
});

// @desc       Get all users
// @route      GET /api/users
// @access     Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: 'users not found' });
  }
});

// @desc       Get user by ID
// @route      GET /api/users/:id
// @access     Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const userNoPassword = user.select('-password');

  if (userNoPassword) {
    res.json(userNoPassword);
  } else {
    res.status(404).json({ message: 'user not found' });
  }
});

// @desc       Update user
// @route      PUT /api/users/:id
// @access     Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// @desc       Delete user
// @route      DELETE /api/users/:id
// @access     Admin
const deleteUser = asyncHandler(async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);

  if (deletedUser) {
    res.json(deletedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// @desc      Get user profile
// @route     GET /api/users/profile
// @access    Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// @description     Update user profile
// @route           POST /api/users/profile
// @access          Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
};
