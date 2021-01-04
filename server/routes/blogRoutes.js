// 1. install gatsby in public and maybe find tutorial
// use fake api tutorial if possible and after use our api/blog
// DO THE TUTORIAL!

// - client // frontend
// - admin // dashboard
// - server // backend

// 2. blogController.js - for posts
// GET api/blog/posts
// - read only
// GET api/blog/posts/:slug
// localhost:8080/posts/[title] -> slug -> /api/blog/posts/:slug
// - read only

// 3. blogController.js - for comments
// GET api/blog/posts/:slug/comments
// - read only
// POST api/blog/posts/:slug/comments
// - create only

const express = require('express');
const router = express.Router();
const {
  getBlogPosts,
  getPostBySlug,
} = require('../controllers/blogController');

router.route('/posts').get(getBlogPosts);
router.route('/posts/:slug').get(getPostBySlug);

module.exports = router;
// router
//   .route('/posts/:slug/comments')
//   .get(getBlogComments)
//   .post(createBlogComment);
