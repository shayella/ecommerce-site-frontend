import React, { Component } from "react";
import CartOverlay from "../cart/CartOverlay";

class CartNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCartOverlay: false,
    };
    this.toggleShowCartOverlay = this.toggleShowCartOverlay.bind(this);
  }

  toggleShowCartOverlay() {
    console.log("CHANGED");
    this.setState((prevState) => ({
      showCartOverlay: !prevState.showCartOverlay,
    }));
  }

  render() {
    return (
      <>
        <p
          className="shopping-cart-container"
          onClick={this.toggleShowCartOverlay}
        >
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
        </p>
        <CartOverlay showCart={this.state.showCartOverlay} />
      </>
    );
  }
}

export default CartNav;
