const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc      Create a new user
// @route     POST /api/users
// @access    Admin
const createUser = asyncHandler(async (req, res) => {
  try {
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
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid user data', error });
  }
});

// @desc       Get all users
// @route      GET /api/users
// @access     Admin
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    if (users) {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(404).json({ message: 'users not found' });
  }
});

// @desc       Get user by ID
// @route      GET /api/users/:id
// @access     Admin
const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
      res.json(user);
    }
  } catch (error) {
    res.status(404).json({ message: 'user not found' });
  }
});

// @desc       Update user
// @route      PUT /api/users/:id
// @access     Admin
const updateUser = asyncHandler(async (req, res) => {
  try {
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
    }
  } catch (error) {
    res.status(404).json({ message: 'User not found', error });
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
    res.status(404).json({ message: 'User not found', error });
  }
});

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
