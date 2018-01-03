const keys = require('../../config/keys')


module.exports = (survey) => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3> We'd like your kind feedback!</h3>
          <p> Please answer the following question: </p>
          <p>${survey.body}</p>
          <div>
            <a href="{keys.redirectDomain}/api/surveys/feedback">Yes</a>
          </div> 
          <div>
            <a href="{keys.redirectDomain}/api/surveys/feedback">No</a>
          </div>
        </div>
      </body>
    </html> 
  `;
};
