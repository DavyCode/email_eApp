const   express = require('express'),
        app = express(),
        passport = require('passport'),
        GoogleStrategy = require('passport-google-oauth20').Strategy
        keys = require('./config/keys'),
        PORT = process.env.PORT || 3000;


passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL :'/auth/google/callback'
        }, 
        (accessToken) => {
            console.log(accessToken);
        }
    )
);


app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope :['profile', 'email']
    })
);

app.get(
    '/auth/google/callback',
    passport.authenticate('google')
);

app.listen(PORT, ( ) => {
    console.log("***server up on PORT 3000!!***")
});