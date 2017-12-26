const   express = require('express'),
        app = express(),
        passport = require('passport'),
        GoogleStrategy = require('passport-google-oauth20').Strategy
        keys = require('./config/keys'),
        PORT = process.env.PORT || 3000;


passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL :'/auth/google/callback'
    }, () =>{
         console.log(accessToken);
    })
);


app.get('/', (req, res) => {
    res.send({HI : "Hello Dave"})
})


app.listen(PORT, ( ) => {
    console.log("server up on PORT 3000!!")
});