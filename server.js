const express = require('express'),
        app = express(),
        PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send({HI : "Hello Dave"})
})


app.listen(PORT, ( ) => {
    console.log("server up on PORT 3000!!")
});