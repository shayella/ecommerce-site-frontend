import React, { Component } from "react";

class CartOverlay extends Component {
  render() {
    return (
      <>
        <div className={this.props.showCart ? "cart-overlay" : "hidden"}>
          <div className="mini-cart">
            <p>Cart Mini</p>
          </div>
        </div>
      </>
    );
  }
}

export default CartOverlay;
