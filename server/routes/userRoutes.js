const express = require('express');
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController');

router.route('/').post(createUser).get(getUsers);
router.route('/:id').get(getUserById).delete(deleteUser).put(updateUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);

module.exports = router;
