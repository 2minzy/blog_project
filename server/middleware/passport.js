const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, cb) => {
      try {
        const user = await User.findOne({ email });
        const access = await user.matchPassword(password);
        if (!user || !access) {
          return cb(null, false, { message: 'Incorrect email or password.' });
        }

        // Response for the frontend
        const payload = {
          id: user._id,
          email: user.email,
        };

        return cb(null, payload, { message: 'Logged In Successfully' });
      } catch (err) {
        cb(err);
      }
    }
  )
);

// https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314
