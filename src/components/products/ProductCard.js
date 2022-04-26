import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addProductToCart } from "../../actions/cartActions";
import EmptyCartImage from "../../images/empty-cart";

class ProductCard extends Component {
  render() {
    const currentProduct = this.props.product;
    let productPriceCurrency = currentProduct.prices.filter(
      (price) => price.currency.symbol === this.props.selectedCurrency.symbol
    )[0];

    let defaultSelectedAttributes = {};

    currentProduct.attributes &&
      currentProduct.attributes.map((attribute) => {
        defaultSelectedAttributes[attribute.name] = attribute.items[0].value;
        return defaultSelectedAttributes;
      });
    return (
      <Link
        to={`/product/${currentProduct.id}`}
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
              <button
                className="product-cart"
                onClick={(e) => {
                  e.preventDefault();
                  this.props.addProductToCart({
                    ...currentProduct,
                    count: 1,
                    selectedAttributes: { ...defaultSelectedAttributes },
                  });
                }}
              >
                <EmptyCartImage size={24} color="white" />
                {/* <i className="fa fa-shopping-cart" aria-hidden="true"></i> */}
              </button>
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
  addProductToCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedCurrency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps, { addProductToCart })(ProductCard);
