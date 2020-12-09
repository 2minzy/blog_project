const express = require('express');
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.route('/').post(createUser).get(getUsers);
router.route('/:id').get(getUserById).delete(deleteUser).put(updateUser);

module.exports = router;
