import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Emaily</h5>
              <p className="grey-text text-lighten-4">Feel free to get in touch with us.</p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Emaily</h5>
              <ul>
                <li><a className="grey-text text-lighten-3" href="#!">We are Social</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
          © 2017 Copyright Emaily-Survey
          <a className="grey-text text-lighten-4 right" href="#!">Emaily</a>
          </div>
        </div>
      </footer>
    </div>
  )
};

export default Footer;