import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { addProductToCart } from "../../actions/cartActions";
class ProductInfo extends Component {
  constructor(props) {
    super(props);
    this.checkUnselectedProductAttributes =
      this.checkUnselectedProductAttributes.bind(this);
  }
  checkUnselectedProductAttributes(allAttributes, selectedAttributes) {
    let unselectedAttributes = [];
    unselectedAttributes = allAttributes.filter(
      (attribute) => !Object.keys(selectedAttributes).includes(attribute.name)
    );

    let unselectedAttributesStr = "";
    for (let item of unselectedAttributes) {
      unselectedAttributesStr += "- " + item.name + "\n ";
    }

    alert(
      `Please select the \n ${unselectedAttributesStr} attribute(s) of the product before adding to cart.`
    );
  }
  render() {
    let product = this.props.info;
    let productPrice = product.prices.filter(
      (price) => price.currency.symbol === this.props.selectedCurrency.symbol
    )[0];
    let productHasAttributes = product.attributes.length > 0;

    return (
      <div className="product-info">
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
                            ? attribute.type === "swatch"
                              ? "product-attribute swatch-type selected-attribute"
                              : "product-attribute selected-attribute"
                            : attribute.type === "swatch"
                            ? "product-attribute swatch-type"
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
          onClick={(e) => {
            if (!product.inStock) {
              e.preventDefault();
              alert("Sorry, this product is out of stock.");
            } else if (productHasAttributes) {
              if (!Object.keys(product).includes("selectedAttributes")) {
                e.preventDefault();
                this.checkUnselectedProductAttributes(product.attributes, {});
              } else if (
                product.attributes.length !==
                Object.keys(product.selectedAttributes).length
              ) {
                e.preventDefault();
                this.checkUnselectedProductAttributes(
                  product.attributes,
                  product.selectedAttributes
                );
              } else {
                this.props.addProductToCart({ ...product, count: 1 });
              }
            }
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
