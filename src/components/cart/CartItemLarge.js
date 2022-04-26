import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ImageSlider from "./ImageSlider";
import {
  increaseProductInCart,
  decreaseProductInCart,
} from "../../actions/cartActions";

class CartItemFullView extends Component {
  render() {
    const { brand, name, gallery, prices, attributes, count } =
      this.props.product;

    let productPrice = prices.filter(
      (price) => price.currency.symbol === this.props.selectedCurrency.symbol
    )[0];

    return (
      <div
        className={
          this.props.isMiniCart && this.props.isMiniCart
            ? "cart-item-lg mini-cart-item"
            : "cart-item-lg"
        }
      >
        <div className="cart-item-inner">
          <div className="item-info">
            <p className="cart-item-brand">{brand}</p>
            <p className="cart-item-name">{name}</p>
            <p className="cart-item-price">
              {productPrice.currency.symbol} {productPrice.amount}
            </p>

            {/* Make a reusable attributes component */}
            {attributes && attributes.length > 0 ? (
              attributes.map((attribute, i) => {
                return (
                  <Fragment
                    key={
                      this.props.isMiniCart
                        ? "miniOutAttr" + i + attribute.name
                        : "fullOutAttr" + i + attribute.name
                    }
                  >
                    <p className="product-label">{attribute.name}</p>
                    <div className="cart-item-attribute-container">
                      {attribute.items.map((item, i) => {
                        return (
                          <button
                            key={
                              this.props.isMiniCart
                                ? "miniAttr" + i + item.id
                                : "fullAttr" + i + item.id
                            }
                            className={
                              this.props.product.selectedAttributes &&
                              Object.keys(
                                this.props.product.selectedAttributes
                              ).includes(attribute.name) &&
                              this.props.product.selectedAttributes[
                                attribute.name
                              ] === item.value
                                ? attribute.type === "swatch"
                                  ? "product-attribute swatch-type selected-attribute"
                                  : "product-attribute selected-attribute"
                                : attribute.type === "swatch"
                                ? "product-attribute swatch-type"
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
                  </Fragment>
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

          {/* Image Slider Section */}

          {this.props.isMiniCart ? (
            <img className="cart-item-image" alt="" src={gallery[0]} />
          ) : (
            <ImageSlider gallery={gallery} />
          )}
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
