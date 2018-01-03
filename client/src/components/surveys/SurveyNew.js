//shows survey form and review
import React, { Component } from 'react';
import SurveyForm from './SurveyForm'

class SurveyNew extends  Component {
  render () {
    return (
    <div>
      Survey New
      <SurveyForm />
    </div>
    )
  }
};

export default SurveyNew;