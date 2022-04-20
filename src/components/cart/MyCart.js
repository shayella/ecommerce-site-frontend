import React, { Component } from "react";
import CartItemFullView from "./CartItemLarge";
import "./cart.css";
class MyCart extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <div className="my-cart-wrapper">
        <h1 className="cart-heading">Cart</h1>
        <CartItemFullView />
        <CartItemFullView />
      </div>
    );
  }
}

export default MyCart;
