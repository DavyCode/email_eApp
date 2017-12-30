import React, { Component } from 'react';

class Header extends Component {
  render () {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="/" className="left brand-logo">Emaily-Survey</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="sass.html">Login</a></li>
              <li><a href="badges.html">Login with Google</a></li>
              <li><a href="collapsible.html">Login with Facebook</a></li>
            </ul>
          </div>
        </nav>  
      </div>
    )
  }
};

export default Header;