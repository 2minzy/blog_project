const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  updatePost,
} = require('../controllers/postController');

router.route('/').post(createPost).get(getPosts);
router.route('/:id').get(getPostById).delete(deletePost).put(updatePost);

module.exports = router;
