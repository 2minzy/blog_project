const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const passport = require('passport');

const authUser = asyncHandler(async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Failed to login',
        user,
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(user, process.env.PRIVATE_JWT_KEY);
      return res.json({ user, token });
    });
  })(req, res, next);
});

module.exports = { authUser };
