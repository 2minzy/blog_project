const express = require('express');
const passport = require('passport');
const { admin } = require('../middleware/authMiddleware');
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const router = express.Router();

router
  .use(passport.authenticate('jwt', { session: false }))
  .use(admin)
  .route('/')
  .post(createUser)
  .get(getUsers);
router
  .use(passport.authenticate('jwt', { session: false }))
  .use(admin)
  .route('/:id')
  .get(getUserById)
  .delete(deleteUser)
  .put(updateUser);

module.exports = router;
