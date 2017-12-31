const   express = require('express'),
        keys = require('./config/keys'),   
        mongoose = require('mongoose'),
        cookieSession = require('cookie-session'),
        passport = require('passport'),
        bodyParser = require("body-parser"),
        app = express(), 
        PORT = process.env.PORT || 3001;
require('./models/User');
require('./services/passport');
  

//DATABASE CONNECTION
mongoose.connect(keys.mongoURI,(err) => {
    (err) ? console.error(err, 'Error Connecting to Database!'): console.log('DB Connected. Build Something Awesome!');
});


app.use(bodyParser.urlencoded({ extended: true }));
//default engine
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

//COOKIE SESSION
// app.use(
//     cookieSession({
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//         keys: [keys.cookieKey]
// }));
//EXPRESS SESSION 
app.use(
    require('express-session')({
        secret: [keys.cookieKey],
        resave: false,
        saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// AUTHROUTES
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);



app.listen(PORT, () => console.log("***server up on PORT 3001!!***"));