const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { admin } = require('../middleware/authMiddleware');

router
  .use(passport.authenticate('jwt', { session: false }))
  .route('/')
  .post(admin, createUser)
  .get(admin, getUsers);
router
  .use(passport.authenticate('jwt', { session: false }))
  .route('/:id')
  .get(admin, getUserById)
  .delete(admin, deleteUser)
  .put(admin, updateUser);

module.exports = router;
