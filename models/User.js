const mongoose = require('mongoose'),
      { Schema } = mongoose,
      passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new Schema({
    googleId:  String,
    facebookId:  String,
    githubId: String,
    password: String,
    username: String
});

UserSchema.plugin(passportLocalMongoose);
mongoose.model('Users', UserSchema);

