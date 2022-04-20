import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductInfo extends Component {
  state = {};
  render() {
    let product = this.props.info;
    let productPrice = product.prices.filter(
      (price) => price.currency.symbol === "$"
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
                        key={i}
                        className="product-attribute"
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
        <Link to="/cart" className="add-btn">
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

export default ProductInfo;
