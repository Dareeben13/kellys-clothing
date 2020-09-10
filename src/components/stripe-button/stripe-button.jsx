import React from "react";

import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100; // Because stripe expects our payment price to be in cents

  const publishableKey =
    "pk_test_51HPixvJJjizDh9w4jszvNJBF85GPKmybjTtMX9R4OGrFPTZNayzMoqGMpJ2FOwiCumuzR3fDnLjCyItgElu9b3PG00Uy3x8tMh";

  const onToken = (token) => {
    console.log(token);

    alert("Payment Successful. Thank you for Patronizing Us");
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

export default StripeCheckoutButton;
