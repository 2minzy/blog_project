const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');
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
          role: user.role,
        };

        return cb(null, payload, { message: 'Logged In Successfully' });
      } catch (err) {
        cb(err);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.PRIVATE_JWT_KEY,
    },
    async (jwtPayload, cb) => {
      try {
        const user = await User.findById(jwtPayload.id);
        return cb(null, user);
      } catch (e) {
        return cb(e);
      }
    }
  )
);

// https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-97ㅋ61539c4314
