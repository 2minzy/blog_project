const express = require('express');
const router = express.Router();
const { authUser } = require('../controllers/authController');

router.route('/login').post(authUser);

module.exports = router;
