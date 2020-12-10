const express = require('express');
const router = express.Router();
const {
  createComment,
  getComments,
  getCommentById,
  deleteComment,
  updateComment,
} = require('../controllers/commentController');

router.route('/').post(createComment).get(getComments);
router
  .route('/:id')
  .get(getCommentById)
  .delete(deleteComment)
  .put(updateComment);

module.exports = router;
