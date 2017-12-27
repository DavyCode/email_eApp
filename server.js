const   express = require('express'),
        mongoose = require('mongoose');
        app = express(), 
        PORT = process.env.PORT || 3000;
require('./models/User');
require('./services/passport');
  

//DATABASE CONNECTION
mongoose.connect(keys.mongoURI,(err) => {
    (err) ? console.error(err, 'Error Connecting to Database!'): console.log('DB Connected. Build Something Awesome!');
});
      
// AUTHROUTES
require('./routes/authRoutes')(app);




app.listen(PORT, () => console.log("***server up on PORT 3000!!***"));