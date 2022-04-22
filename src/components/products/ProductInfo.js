import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { addProductToCart } from "../../actions/cartActions";
class ProductInfo extends Component {
  state = {};
  render() {
    let product = this.props.info;
    let productPrice = product.prices.filter(
      (price) => price.currency.symbol === this.props.selectedCurrency.symbol
    )[0];

    let productHasAttributes = product.attributes.length > 0;

    return (
      <div>
        <p className="brand-name">{product.brand}</p>
        <p className="product-name">{product.name}</p>

        {productHasAttributes ? (
          product.attributes.map((attribute) => {
            return (
              <>
                <p className="product-label">{attribute.name}</p>
                <div className="product-attribute-container">
                  {attribute.items.map((item, i) => {
                    return (
                      <button
                        key={product.id + i}
                        className={
                          product.selectedAttributes &&
                          Object.keys(product.selectedAttributes).includes(
                            attribute.name
                          ) &&
                          product.selectedAttributes[attribute.name] ===
                            item.value
                            ? "product-attribute selected-attribute"
                            : "product-attribute"
                        }
                        onClick={() => {
                          this.props.selectAttributes(
                            attribute.name,
                            item.value
                          );
                        }}
                        style={
                          attribute.type === "swatch"
                            ? { backgroundColor: item.value, color: item.value }
                            : {}
                        }
                      >
                        {attribute.type === "swatch" ? "" : item.value}
                      </button>
                    );
                  })}
                </div>
              </>
            );
          })
        ) : (
          <></>
        )}

        <p className="product-label">Price</p>
        <p className="product-price">
          {productPrice.currency.symbol + " "}
          {productPrice.amount}
        </p>
        <Link
          to="/cart"
          onClick={() => {
            this.props.addProductToCart({ ...product, count: 1 });
          }}
          className="add-btn"
        >
          Add to Cart
        </Link>
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>
      </div>
    );
  }
}

ProductInfo.propTypes = {
  selectedCurrency: PropTypes.object,
  addProductToCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedCurrency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps, { addProductToCart })(ProductInfo);
