const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
} = require('../controllers/categoryController');

router
  .use(passport.authenticate('jwt', { session: false }))
  .route('/')

  .post(createCategory)
  .get(getCategories);
router
  .use(passport.authenticate('jwt', { session: false }))
  .route('/:id')
  .get(getCategoryById)
  .delete(deleteCategory)
  .put(updateCategory);

module.exports = router;
