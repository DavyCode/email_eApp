import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//auth button markup
const authMarkup = () => {
  return (
    <div>
    <li><Link to="/auth/login">Login</Link></li>
      <li><Link to="/auth/register">Sign up</Link></li>
      <li><Link to="/auth/google">Login with Google</Link></li>
      <li><Link to="/auth/facebook">Login with Facebook</Link></li>
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
        return <li><Link to="/api/logout">Logout</Link></li>;
    }
  };

  render () {
    return (
      <div>
        <nav>
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
        </nav>  
      </div>
    )
  }
};


function mapStateToProps({ auth }) {
  return { auth };
};
export default connect(mapStateToProps)(Header);