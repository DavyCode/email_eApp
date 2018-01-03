import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'



const FIELDS = [
  { label:"Survey Title", name:'title', valueError: 'title is required' },
  { label:"Subject Line", name:'subject', valueError: 'a subject is required'},
  { label:"Email Body", name:'body' , valueError: 'body is required'}, 
  { label:"Recipient List", name:'emails', valueError: 'type in atleast an email'},
];


class SurveyForm extends  Component {
  renderFields () {
    return FIELDS.map(({ label, name }) => {
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
        <form id="survey-form" onSubmit={this.props.handleSubmit(values => console.log(values))}>
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

  errors.emails = validateEmails(values.emails || '');

  FIELDS.forEach( ({ name, valueError }) => {
    if (!values[name]) {
      errors[name] = valueError;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm'
})(SurveyForm);