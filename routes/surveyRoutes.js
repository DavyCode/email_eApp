const mongoose = require('mongoose'),
      requireLogin = require('../middlewares/requireLogin'),
      requireCredits = require('../middlewares/requireCredits'),
      Mailer = require('../services/Mailer'),
      surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');



module.exports = app => {
  app.get('/api/surveys/feedback', (req, res) => {
    res.send('Thanks for your feedback')
  })

  
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })), 
      _user: req.user.id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
      try {  
        console.log('The mailer***',mailer)
        await mailer.send();
        console.log('The survey***',survey)
        await survey.save();
        req.user.credits -= 1;
        console.log('updated credits*** ',req.user.credits)
        const user = await req.user.save();
        console.log('the updated user***',user)
        res.send(user);
      }catch (err) {
        res.status(422).send(err);
      }
  });
};