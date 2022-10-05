import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { v4 as uuidv4 } from "uuid";

import CheckOutItem from "../../components/checkout-item/checkout-item";
import CustomButton from "../../components/custom-button/custom-button";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button";

import { selectCartItems, selectCartTotal } from "../../redux/cart/cart.selectors";

import "./checkout.scss";

function CheckoutPage({ cartItems, total }) {
  const onClick = () => {
    if (window.VPayDropin) {
      const options = {
        amount: total,
        currency: "NGN",
        domain: "live",
        key: "a49b2ce1-0841-4ff9-88ae-6c99ad50cdf6",
        email: "ebendare@gmail.com",
        transactionref: uuidv4(),
        customer_service_channel: "090865521212",
        txn_charge: 1,
        txn_charge_type: "flat",
        onSuccess: (message) => {
          console.log("Message!!!!!!!", message);
        },
      };
      const { open, exit } = window.VPayDropin.create(options);
      open();
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckOutItem cartItem={cartItem} key={cartItem.id} />
      ))}
      <div className="total">
        <span>TOTAL : ${total} </span>
      </div>
      <div className="test-warning">
        *Please use the following test credit card for payments*
        <br />
        4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
      </div>
      <CustomButton onClick={() => onClick()}>Pay with VPay</CustomButton>
      {/* <StripeCheckoutButton price={total} /> */}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
