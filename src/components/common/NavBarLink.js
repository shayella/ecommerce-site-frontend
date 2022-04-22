import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeSelectedCategory } from "../../actions/categoriesActions";
import { fetchProductByCategory } from "../../actions/productActions";
import { Link } from "react-router-dom";

class MyNavBarLink extends Component {
  render() {
    return (
      <Link
        to={"/"}
        onClick={() => {
          this.props.changeSelectedCategory(this.props.name);
          this.props.fetchProductByCategory(this.props.name);
        }}
        className={this.props.isSelected ? "link link-active" : "link"}
      >
        {this.props.name}
      </Link>
    );
  }
}

MyNavBarLink.propTypes = {
  changeSelectedCategory: PropTypes.func.isRequired,
};

export default connect(null, {
  changeSelectedCategory,
  fetchProductByCategory,
})(MyNavBarLink);
