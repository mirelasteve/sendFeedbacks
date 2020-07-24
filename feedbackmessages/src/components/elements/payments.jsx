import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions'
class Payments extends Component { 
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return(
            <StripeCheckout
                amount={500} 
                token = {token=>this.props.handleStripeToken(token)}
                stripeKey = {process.env.REACT_APP_STRIPE_KEY}
                name = 'Feedback Messages'
                description = '5$ for 5 emails'
            >
            <button className='btn text-light-app transparent'>Add Credits</button>
            </StripeCheckout>
        )	} 
 } 
 export default connect(null,actions)(Payments);