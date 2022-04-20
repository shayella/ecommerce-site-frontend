import React, { Component } from "react";

class CartItemFullView extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <div className="cart-item-lg">
        <div className="cart-item-inner">
          <div className="item-info">
            <p className="cart-item-brand">Appollo</p>
            <p className="cart-item-name">Running</p>
            <p className="cart-item-price">$30</p>
            <div className="cart-item-attribute-container">
              <button className="cart-item-attribute">Small</button>

              <button className="cart-item-attribute">Medium</button>
            </div>
          </div>

          <div className="cart-counters">
            <button className="cart-item-counter">+</button>
            <p className="cart-item-count">1</p>
            <button className="cart-item-counter">-</button>
          </div>

          <div>
            <img
              className="cart-item-image"
              alt=""
              src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CartItemFullView;
