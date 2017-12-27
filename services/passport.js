const   passport = require('passport'),
        GoogleStrategy = require('passport-google-oauth20').Strategy
        mongoose = require('mongoose'),
        keys = require('../config/keys'),
        User = mongoose.model('Users'); //user model class

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL :'/auth/google/callback'
        }, 
        (accessToken, refreshToken, profile, done) => {
          new User({ googleId : profile.id}).save();
            // console.log('ACCESS TOKEN : ' + accessToken, 'REFRESH TOKEN' + refreshToken, "PROFILE : " + profile.id);
        }
    )
);