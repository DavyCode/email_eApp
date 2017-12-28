const   passport = require('passport'),
        GoogleStrategy = require('passport-google-oauth20').Strategy,
        FacebookStrategy = require('passport-facebook').Strategy,
        passportLocalMongoose = require('passport-local-mongoose'),
        LocalStrategy = require('passport-local'),
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

  //========
//GOOGLE Oauth
//======================
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL :'/auth/google/callback',
            proxy : true
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

 //========
//FACEBOOK Oauth
//==========================
passport.use(
    new FacebookStrategy({
        clientID: keys.facebookClientID,
        clientSecret:keys.facebookClientSecret,
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'email']
        },
        (accessToken, refreshToken, profile, done) => {
            console.log(accessToken, refreshToken, profile);
            User.findOne({ facebookId: profile.id})
                .then((existingUser) => {
                    if(existingUser) {
                        //user exist with the give ID
                        done(null, existingUser);
                    }else{
                        //no user with given ID Create new User
                        new User({ facebookId : profile.id})
                            .save()
                            .then(user => done(null, user));
                    };
                });
        }
    )
);



 //========
//LOCAL auth
//==========================
passport.use(
    new LocalStrategy(User.authenticate()));