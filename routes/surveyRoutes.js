const _ = require('lodash'),
      Path = require('path-parser'),
      { URL } = require('url'),
      mongoose = require('mongoose'),
      requireLogin = require('../middlewares/requireLogin'),
      requireCredits = require('../middlewares/requireCredits'),
      Mailer = require('../services/Mailer'),
      surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');



module.exports = app => {
  
  app.get('/api/surveys/:id/:yes', (req, res) => {
    res.send('Thanks for your feedback')
  })

  app.post('/api/surveys/webhooks', (req, res) => {
    const events = _.map(req.body, ({ email, url }) => {
      const pathname = new URL(url).pathname;
      const p = new Path('/api/surveys/:surveyId/:choice');
      const match = p.test(pathname);
      if(match) {
        return { email, surveyId: match.surveyId, choice: match.choice }
      }
    });

    const compactEvents = _.compact(events);
    const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');

    res.send({});
  });
  
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    
    //possible addition params customer survey redirect url
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
        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();
        res.send(user);
      }catch (err) {
        res.status(422).send(err);
      }
  });
};