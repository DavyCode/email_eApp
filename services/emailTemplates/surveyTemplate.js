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
            <a href="http://localhost:3000/api/surveys/${survey.id}/yes">Yes</a>
          </div> 
          <div>
            <a href="http://localhost:3000/api/surveys/${survey.id}/no">No</a>
          </div>
        </div>
      </body>
    </html> 
  `;
};
