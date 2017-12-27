const   express = require('express');
        require('./services/passport')
const   app = express(), 
        PORT = process.env.PORT || 3000;

// AUTHROUTES
require('./routes/authRoutes')(app);




app.listen(PORT, ( ) => {
    console.log("***server up on PORT 3000!!***")
});