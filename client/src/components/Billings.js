import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux';
import * as actions from '../actions'


class Billings extends Component {
  render() {
    return (
      <div>
        <StripeCheckout 
          name="$5 for 5 email credits"
          description="Test Card: 4242 4242 4242 4242"
          amount={500} 
          token={token => this.props.handleToken(token)} 
          stripeKey={process.env.REACT_APP_STRIPE_KEY}    
        >
          <button className="waves-effect waves-light btn">
            Add Credits
          </button>
        </StripeCheckout>
      </div>
    );
  }
}
export default connect(null, actions)(Billings);