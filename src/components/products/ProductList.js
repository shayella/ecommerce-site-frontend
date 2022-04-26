import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./product.css";
import ProductCard from "./ProductCard";

class ProductList extends Component {
  render() {
    let categoryName = this.props.selectedCategory;
    categoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
    return (
      <div>
        <h1 className="category-name">{categoryName}</h1>
        <div className="products-container">
          {this.props.products.products.map((product, i) => {
            return <ProductCard key={i + product.id + i} product={product} />;
          })}
        </div>
      </div>
    );
  }
}

PropTypes.ProductList = {
  fetchProductByCategory: PropTypes.func.isRequired,
  products: PropTypes.object,
};

const mapStateToProps = (state) => ({
  products: state.products,
  selectedCategory: state.categories.selectedCategory,
});

export default connect(mapStateToProps)(ProductList);
// export default ProductList;
