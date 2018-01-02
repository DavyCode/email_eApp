const mongoose = require('mongoose'),
      { Schema } = mongoose,
      RecipientSchema = require('./Recipient');
      

var surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref:"User" },
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);

