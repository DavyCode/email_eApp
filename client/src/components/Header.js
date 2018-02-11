import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Billings from './Billings';

// <li><Link to="/auth/login">Login</Link></li>
// <li><Link to="/auth/register">Sign up</Link></li>

//auth button markup
const authMarkup = () => {
  return (
    <div>
      <li><a href="/auth/google">Login with Google</a></li>
      <li><a href="/auth/facebook">Login with Facebook</a></li>
    </div>
  );
};



class Header extends Component {
  renderContent () {
    switch (this.props.auth) {
      case null:
        return;
      case false:  
        return authMarkup();
      default:
        return [
              <li key="1" ><Billings /></li>,
              <li key="3">
                <button
                  className="disabled btn-flat"
                >
                  Credits : {this.props.auth.credits}
                </button>
              </li>,
              <li key="2" ><a href="/api/logout">Logout</a></li>
        ]; 
    }
  };


  render () {
    return (
      <div>
        <nav>
           <div className="container">
            <div className="nav-wrapper">
              <Link 
                to={this.props.auth? '/surveys' : '/'} 
                className="left brand-logo"
              >
                Emaily-Survey
              </Link>
              <ul id="nav-mobile" className="right ">
                {this.renderContent()}   
              </ul>
            </div>
          </div>
        </nav>  
      </div>
    )
  }
};


function mapStateToProps({ auth }) {
  return { auth };
};
export default connect(mapStateToProps)(Header);