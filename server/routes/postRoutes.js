const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  updatePost,
} = require('../controllers/postController');

router
  .use(passport.authenticate('jwt', { session: false }))
  .route('/')
  .post(createPost)
  .get(getPosts);
router
  .use(passport.authenticate('jwt', { session: false }))
  .route('/:id')
  .get(getPostById)
  .delete(deletePost)
  .put(updatePost);

module.exports = router;
