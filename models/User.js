const mongoose, { Schema } = require('mongoose');


var UserSchema = new Schema({
    googleId  :  String
});


module.exports = mongoose.model('Users', UserSchema);