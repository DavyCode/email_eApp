const mongoose = require('mongoose'),
      { Schema } = mongoose,
      passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new Schema({
    googleId: String,
    facebookId: String,
    password: String,
    username: String,
    credits: { type: Number,default: 0}
});

UserSchema.plugin(passportLocalMongoose);
mongoose.model('Users', UserSchema);

