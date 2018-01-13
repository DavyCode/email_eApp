import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList'

const Dashboard = () => {
  return (
    <div>
      <div>
        <div style={{ textAlign: 'center'}}>
        <div class="row">
          <div class="col s12 m7 l12">
            <div class="card">
              <div class="card-content">
                <h1>Dashboard</h1>
              </div>
              <div class="card-action">
                <a href="">Emaily - Survey</a>
              </div>
            </div>
          </div>
        </div>
        </div>

      </div>
      <SurveyList />
      <div className="fixed-action-btn">
        <Link  to='/surveys/new' className="btn-floating btn-large waves-effect waves-light red">
          <i className="material-icons">add</i>
        </Link>      
      </div>
    </div>
  );
};

export default Dashboard;