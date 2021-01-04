const express = require('express');
const passport = require('passport');
const { author } = require('../middleware/authMiddleware');
const {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  updatePost,
} = require('../controllers/postController');
const router = express.Router();

router
  .use(passport.authenticate('jwt', { session: false }))
  .route('/')
  .post(createPost)
  .get(getPosts);

router
  .use(passport.authenticate('jwt', { session: false }))
  .route('/:id')
  .get(author, getPostById)
  .delete(author, deletePost)
  .put(author, updatePost);

module.exports = router;
