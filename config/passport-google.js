const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

passport.use(new googleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) {
                console.log("error in google authentication", err);
                return;
            }

            console.log(profile);

            if (user) {
                return done(null, user);
            } else {
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },
                    function (err, user) {
                        if (err) {
                            console.log("error in user creation", err);
                            return;
                        }
                        return done(null, user);
                    }
                )
            }

        })
    }
))
