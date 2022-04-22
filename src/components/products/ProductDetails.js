import React, { Component } from "react";
import ProductImagePreviewer from "./ProductImagePreviewer";
import "./productDetail.css";
import { withRouter } from "../common/routerUtil";
import { client } from "../..";
import { gql } from "@apollo/client";
import ProductInfo from "./ProductInfo";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
    this.selectAttributes = this.selectAttributes.bind(this);
  }

  fetchProductDetails(id) {
    const query = gql`
      query ProductDetails($id: String!) {
        product(id: $id) {
          id
          name
          inStock
          description
          category
          brand
          attributes {
            name
            type
            items {
              displayValue
              value
            }
          }
          gallery
          prices {
            currency {
              symbol
            }
            amount
          }
        }
      }
    `;

    client
      .query({
        query: query,
        variables: {
          id: id,
        },
      })
      .then((result) => {
        this.setState({
          product: result.data.product,
        });
      });
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

    console.log("Product ", newProductState);
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
              // key={this.state.product.id}
            ></ProductInfo>
          </div>
        ) : (
          <div className="product-container">
            <p>Loading...</p>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(ProductDetails);
