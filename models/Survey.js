const mongoose = require('mongoose'),
      { Schema } = mongoose;
      

var surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [String]
});

mongoose.model('surveys', surveySchema);

