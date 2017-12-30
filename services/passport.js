const   passport = require('passport'),
        GoogleStrategy = require('passport-google-oauth20').Strategy,
        FacebookStrategy = require('passport-facebook').Strategy,
        passportLocalMongoose = require('passport-local-mongoose'),
        LocalStrategy = require('passport-local'),
        mongoose = require('mongoose'),
        keys = require('../config/keys'),
        User = mongoose.model('Users'); //user model class


     
passport.serializeUser(
  (user, done) => {
    done(null, user.id); //user.id database generated Id
});
passport.deserializeUser(
  async (id, done) => {
  const user = await User.findById(id)
  done(null, user);
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
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id})
        if(existingUser) {
              //user exist with the give ID
          return done(null, existingUser);
        }
            //no user with given ID Create new User
          const user = await new User({ googleId : profile.id}).save()
          done(null, user);
    }
  )
);

 //========
//FACEBOOK Oauth
//==========================
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret:keys.facebookClientSecret,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos', 'email'],
      proxy : true
    },
    async (accessToken, refreshToken, profile, done) => {
            console.log(accessToken, refreshToken, profile);
      const existingUser = await User.findOne({ facebookId: profile.id})
        if(existingUser) {
            //user exist with the give ID
          return done(null, existingUser);
        }
          //no user with given ID Create new User
          new User({ facebookId : profile.id}).save()
          done(null, user);
    }
  )
);



 //========
//LOCAL auth
//==========================
passport.use(
    new LocalStrategy(User.authenticate()));