const   passport = require('passport'),
        GoogleStrategy = require('passport-google-oauth20').Strategy
        mongoose = require('mongoose'),
        keys = require('../config/keys'),
        User = mongoose.model('Users'); //user model class


     
passport.serializeUser((user, done) => {
    done(null, user.id); //user.id database generated Id
});
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user =>  {
            done(null, user);
        })
})


passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL :'/auth/google/callback'
        }, 
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id})
                .then((existingUser) => {
                    if(existingUser) {
                        //user exist with the give ID
                        done(null, existingUser);
                    }else{
                        //no user with given ID Create new User
                        new User({ googleId : profile.id})
                            .save()
                            .then(user => done(null, user));
                    }
                })
           }
    )
);