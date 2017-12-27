const mongoose = require('mongoose'),
      { Schema } = mongoose;


var UserSchema = new Schema({
    googleId  :  String
});

mongoose.model('Users', UserSchema);