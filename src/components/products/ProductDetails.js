import React, { Component } from "react";
import PropTypes from "prop-types";
import ProductImagePreviewer from "./ProductImagePreviewer";
import "./productDetail.css";
import { withRouter } from "../common/routerUtil";
import ProductInfo from "./ProductInfo";
import { fetchProductById } from "../../queries";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
    this.selectAttributes = this.selectAttributes.bind(this);
  }

  async fetchProductDetails(id) {
    let data = await fetchProductById(id);
    console.log("RESSULT ", data);
    this.setState({ product: data });
  }

  selectAttributes(attrName, value) {
    let newProductState = {
      ...this.state.product,
    };

    let newAttribute = { [attrName]: value };

    if (Object.keys(newProductState).includes("selectedAttributes")) {
      newProductState = {
        ...newProductState,
        selectedAttributes: {
          ...newProductState.selectedAttributes,
          ...newAttribute,
        },
      };
    } else {
      newProductState = {
        ...newProductState,
        selectedAttributes: { ...newAttribute },
      };
    }

    this.setState({ product: newProductState });
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.fetchProductDetails(id);
  }

  state = {};
  render() {
    return (
      <>
        {this.state.product !== null ? (
          <div className="product-container">
            <ProductImagePreviewer gallery={this.state.product.gallery} />
            <ProductInfo
              info={this.state.product}
              selectAttributes={this.selectAttributes}
              key={this.state.product.id}
            />
          </div>
        ) : (
          <div className="product-container">
            <p className="empty-cart">Loading...</p>
          </div>
        )}
      </>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.object,
};

export default withRouter(ProductDetails);
