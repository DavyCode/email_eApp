const   express = require('express'),
        mongoose = require('mongoose'),
        cookieSession = require('cookie-session'),
        passport = require('passport'),
        app = express(), 
        PORT = process.env.PORT || 3000;
require('./models/User');
require('./services/passport');
  

//DATABASE CONNECTION
mongoose.connect(keys.mongoURI,(err) => {
    (err) ? console.error(err, 'Error Connecting to Database!'): console.log('DB Connected. Build Something Awesome!');
});

//COOKIE SESSION
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

// AUTHROUTES
require('./routes/authRoutes')(app);



app.listen(PORT, () => console.log("***server up on PORT 3000!!***"));