import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions'

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

  //Render form fields value
  const reviewFields = formFields.map( ({name, label}) => {
    return (
      <div key={name}>
        <div>
          <label> {label}</label>
        </div>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  })

  return (
    <div>
      <h4> Confirm entries</h4>
      {reviewFields}
      <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
        Back
      </button>
      <button className="green btn-flat white-text right" onClick={ () => submitSurvey(formValues, history)}>
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
}


function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}


export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview))
