import React, { Component } from "react";
import { gql } from "@apollo/client/core";
import { client } from "../..";
import "./product.css";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";

export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], categoryName: "" };
  }

  fetchCategoryProducts() {
    let { categoryname } = this.props.match.params;
    // this.setState({ categoryName: categoryname });

    const query = gql`
      query CategoryProducts($input: CategoryInput) {
        category(input: $input) {
          name
          products {
            id
            name
            brand
            prices {
              currency {
                symbol
              }
              amount
            }
            inStock
            gallery
            description
            category
          }
        }
      }
    `;

    client
      .query({
        query: query,
        variables: {
          input: { title: categoryname },
        },
      })
      .then((result) => {
        console.log("DATA ", result.data.category.products);
        this.setState({
          data: result.data.category.products,
          // categoryName: result.data.category.name,
        });
      });
  }

  componentDidMount() {
    this.fetchCategoryProducts();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.match.params.categoryName !== this.state.categoryName) {
  //     this.fetchCategoryProducts();
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   const { categoryName } = this.props.match.params;
  //   if (categoryName !== prevState.categoryName) {
  //     this.setState({ categoryName: categoryName });
  //     // this.fetchCategoryProducts();
  //   }
  // }

  render() {
    const { categoryname } = this.props.match.params;

    return (
      <div>
        <h1 className="category-name">
          {categoryname.charAt(0).toUpperCase() + categoryname.slice(1)}
        </h1>
        <div className="products-container">
          {this.state.data.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(ProductList);
// export default ProductList;
