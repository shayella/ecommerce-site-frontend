import React, { Component } from "react";
import ProductImagePreviewer from "./ProductImagePreviewer";
import "./productDetail.css";
import { withRouter } from "./ProductList";
import { client } from "../..";
import { gql } from "@apollo/client";
import ProductInfo from "./ProductInfo";
class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
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
        console.log("Product ", result.data.product);
        this.setState({
          product: result.data.product,
        });
      });
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
            <ProductInfo info={this.state.product}></ProductInfo>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </>
    );
  }
}

export default withRouter(ProductDetails);
