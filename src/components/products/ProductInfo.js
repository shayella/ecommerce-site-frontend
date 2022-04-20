import React, { Component } from "react";

class ProductInfo extends Component {
  state = {};
  render() {
    let product = this.props.info;
    let productPrice = product.prices.filter(
      (price) => price.currency.symbol === "$"
    )[0];

    return (
      <div>
        <p className="brand-name">{product.brand}</p>
        <p className="product-name">{product.name}</p>
        <p className="product-label">{product.attributes[0].name}</p>

        {product.attributes[0].items.map((item) => {
          return <span className="product-price">{item.displayValue}</span>;
        })}
        <p className="product-label">Price</p>
        <p className="product-price">
          {productPrice.currency.symbol + " "}
          {productPrice.amount}
        </p>
        <button className="add-btn">Add to Cart</button>
        <p className="description">{product.description}</p>
      </div>
    );
  }
}

export default ProductInfo;
