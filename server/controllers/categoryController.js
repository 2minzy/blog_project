const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');

// @desc    Create a category
// @route   POST /api/category
// @access  Admin
const createCategory = asyncHandler(async (req, res) => {
  try {
    const createdCategory = await Category.create({ ...req.body });
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(400).json({ message: "can't create category", error });
  }
});

// @desc    Fetch all categories
// @route   GET /api/category
// @access  Admin
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  if (categories) {
    res.json(categories);
  } else {
    res.status(404).json({ message: 'categories not found' });
  }
});

// @desc    Fetch single category
// @route   GET /api/category/:id
// @access  Admin
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    res.json(category);
  } else {
    res.status(404).json({ message: 'category not found' });
  }
});

// @desc    Update a category
// @route   UPDATE /api/category/:id
// @access  Admin
const updateCategory = asyncHandler(async (req, res) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    { new: true }
  );

  if (updatedCategory) {
    res.status(200).json(updatedCategory);
  } else {
    res.status(404).json({ message: "can't update category" });
  }
});

// @desc    Delete a category
// @route   DELETE /api/category/:id
// @access  Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const deletedCategory = await Category.findByIdAndDelete(req.params.id);

  if (deletedCategory) {
    res.json(deletedCategory);
  } else {
    res.status(404).json({ message: 'category not found' });
  }
});

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
};
