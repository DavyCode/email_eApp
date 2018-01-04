import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields'




class SurveyForm extends  Component {

  renderFields () {
    return formFields.map(({ label, name }) => {
      return (
        <Field 
          key={name} 
          component={SurveyField}
          type='text'
          label={label}
          name={name}
        />
      );
    });
  };

  render () {
    return (
      <div>
        <form id="survey-form" onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to='/surveys' className="red btn-flat white-text ">
            CANCEL
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            NEXT
            <i className="material-icons right">check</i>
          </button>
        </form>
      </div>
    )
  }
};

//validation
function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  formFields.forEach( ({ name, valueError }) => {
    if (!values[name]) {
      errors[name] = valueError;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);