const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require('../models/userModel');
const keys = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                const user = await User.findById(jwt_payload._id);
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'User not found' });
                }
            } catch (error) {
                console.log("Error in authentication:", error);
                return done(error, false);
            }
        })
    );
};
