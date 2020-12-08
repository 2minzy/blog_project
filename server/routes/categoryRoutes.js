const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
} = require('../controllers/categoryController');

router.route('/').post(createCategory).get(getCategories);
router
  .route('/:id')
  .get(getCategoryById)
  .delete(deleteCategory)
  .put(updateCategory);

module.exports = router;
