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
    const p = new Path('/api/surveys/:surveyId/:choice'); 

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice }
        }
      })      
      .compact()
      .uniqBy( 'email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        //find survey in database and update responded property
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1},
            $set: { 'recipients.$.responded': true }
          }).exec();
      })
      .value();

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