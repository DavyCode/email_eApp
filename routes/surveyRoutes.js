const mongoose = require('mongoose'),
      requireLogin = require('../middlewares/requireLogin'),
      requireCredits = require('../middlewares/requireCredits'),
      Mailer = require('../services/Mailer'),
      surveyTemplate = require('../services/emailTemplates/surveyTemplate')

      Survey = mongoose.model('surveys');



module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const {title, subject, body, recipients} = req.body;
    
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })), 
      _user: req.user.id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
    mailer.send();
  });
};