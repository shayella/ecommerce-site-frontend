import React, { Component } from "react";

class ProductCard extends Component {
  state = {};
  render() {
    const currentProduct = this.props.product;
    let productPriceCurrency = currentProduct.prices.filter(
      (price) => price.currency.symbol === "$"
    )[0];
    return (
      <div
        key={currentProduct.id}
        className={
          currentProduct.inStock
            ? "product-card"
            : "product-card product-out-of-stock"
        }
      >
        <div className="product-image-container">
          <img
            className="product-image"
            src={currentProduct.gallery[0]}
            alt={currentProduct.name}
          />
          {currentProduct.inStock ? (
            <div className="product-cart">
              <i className="fa fa-cart-shopping"></i>
            </div>
          ) : (
            <div className="no-stock">
              <p>Out of stock</p>
            </div>
          )}
        </div>

        <p className="product-name">{currentProduct.name}</p>
        <p className="product-price">
          {productPriceCurrency.currency.symbol} {productPriceCurrency.amount}
        </p>
      </div>
    );
  }
}

export default ProductCard;
