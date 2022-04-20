import React, { Component } from "react";
import { Link } from "react-router-dom";
class ProductCard extends Component {
  state = {};
  render() {
    const currentProduct = this.props.product;
    let productPriceCurrency = currentProduct.prices.filter(
      (price) => price.currency.symbol === "$"
    )[0];
    return (
      <Link
        to={`/product/${currentProduct.id}`}
        key={currentProduct.id}
        className={
          currentProduct.inStock
            ? "product-card"
            : "product-card product-out-of-stock"
        }
      >
        <div
        // key={currentProduct.id}
        // className={
        //   currentProduct.inStock
        //     ? "product-card"
        //     : "product-card product-out-of-stock"
        // }
        >
          <div className="product-image-container">
            <img
              className="product-image"
              src={currentProduct.gallery[0]}
              alt={currentProduct.name}
            />
            {currentProduct.inStock ? (
              <div className="product-cart">
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              </div>
            ) : (
              <div className="no-stock">
                <p>Out of stock</p>
              </div>
            )}
          </div>

          <p className="product-name">
            {currentProduct.brand} {currentProduct.name}
          </p>
          <p className="product-price">
            {productPriceCurrency.currency.symbol} {productPriceCurrency.amount}
          </p>
        </div>
      </Link>
    );
  }
}

export default ProductCard;
