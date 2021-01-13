const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
  createComment,
  getComments,
  getCommentById,
  deleteComment,
  updateComment,
} = require('../controllers/commentController');

router
  .use(passport.authenticate('jwt', { session: false }))
  .route('/')
  .post(createComment)
  .get(getComments);
router
  .use(passport.authenticate('jwt', { session: false }))
  .route('/:id')
  .get(getCommentById)
  .delete(deleteComment)
  .put(updateComment);

module.exports = router;
