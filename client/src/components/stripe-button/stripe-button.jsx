import React from "react";
import { connect } from 'react-redux'

import CartActionTypes from '../../redux/cart/cart.types'

import axios from "axios";

import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price, dispatch }) => {
  const priceForStripe = price * 100; // Because stripe expects our payment price to be in cents

  const publishableKey =
    "pk_test_51HPixvJJjizDh9w4jszvNJBF85GPKmybjTtMX9R4OGrFPTZNayzMoqGMpJ2FOwiCumuzR3fDnLjCyItgElu9b3PG00Uy3x8tMh";

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        alert("Payment Successful");
        dispatch({ type: CartActionTypes.CLEAR_CART })
      })
      .catch((error) => {
        // console.log("Payment error : ", JSON.parse(error));
        alert(
          "There was an issue with your payment. Please make sure you use the provided credit card "
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="KELLY'S STORE Ltd."
      billingAddress
      shippingAddress
      allowRememberMe
      description={`Your total is ${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};



export default connect()(StripeCheckoutButton);
