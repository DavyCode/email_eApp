import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField'



const FIELDS = [
  { label:"Survey Title", name:'title' },
  { label:"Subject Line", name:'subject' },
  { label:"Email Body", name:'body' },
  { label:"Recipient List", name:'emails' },
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

function validate(values) {
  const errors = {};

  if(!values.title) {
    errors.title = 'Title is required';
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm'
})(SurveyForm);