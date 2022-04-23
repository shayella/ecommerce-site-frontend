import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ImageSlider from "./ImageSlider";
import {
  increaseProductInCart,
  decreaseProductInCart,
} from "../../actions/cartActions";

class CartItemFullView extends Component {
  render() {
    const {
      id,
      brand,
      name,
      gallery,
      prices,
      attributes,
      selectedAttributes,
      count,
    } = this.props.product;

    let productPrice = prices.filter(
      (price) => price.currency.symbol === this.props.selectedCurrency.symbol
    )[0];
    return (
      <div className="cart-item-lg">
        <div className="cart-item-inner">
          <div className="item-info">
            <p className="cart-item-brand">{brand}</p>
            <p className="cart-item-name">{name}</p>
            <p className="cart-item-price">
              {productPrice.currency.symbol} {productPrice.amount}
            </p>

            {/* Make a reusable attributes component */}
            {attributes.length > 0 ? (
              attributes.map((attribute) => {
                return (
                  <>
                    <p className="product-label">{attribute.name}</p>
                    <div className="cart-item-attribute-container">
                      {attribute.items.map((item, i) => {
                        return (
                          <button
                            key={id + i}
                            className={
                              selectedAttributes &&
                              Object.keys(selectedAttributes).includes(
                                attribute.name
                              ) &&
                              selectedAttributes[attribute.name] === item.value
                                ? "product-attribute selected-attribute"
                                : "product-attribute"
                            }
                            style={
                              attribute.type === "swatch"
                                ? {
                                    backgroundColor: item.value,
                                    color: item.value,
                                  }
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
          </div>

          <div className="cart-counters">
            <button
              className="cart-item-counter"
              onClick={() => {
                this.props.increaseProductInCart(this.props.product);
              }}
            >
              +
            </button>
            <p className="cart-item-count">{count}</p>
            <button
              className="cart-item-counter"
              onClick={() => {
                this.props.decreaseProductInCart(this.props.product);
              }}
            >
              -
            </button>
          </div>

          <ImageSlider gallery={gallery} />
        </div>
      </div>
    );
  }
}
CartItemFullView.propTypes = {
  selectedCurrency: PropTypes.object,
  increaseProductInCart: PropTypes.func.isRequired,
  decreaseProductInCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedCurrency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps, {
  increaseProductInCart,
  decreaseProductInCart,
})(CartItemFullView);
