import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class ProductCard extends Component {
  render() {
    const currentProduct = this.props.product;
    let productPriceCurrency = currentProduct.prices.filter(
      (price) => price.currency.symbol === this.props.selectedCurrency.symbol
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
        <>
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
        </>
      </Link>
    );
  }
}

PropTypes.ProductList = {
  selectedCurrency: PropTypes.object,
};

const mapStateToProps = (state) => ({
  selectedCurrency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps)(ProductCard);
