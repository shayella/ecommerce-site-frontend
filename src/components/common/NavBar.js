import React, { Component } from "react";
import PropTypes from "prop-types";
import CartNav from "./CartNav";
import CurrencyOptions from "./CurrencyOptions";
import Logo from "./Logo";
import MyNavBarLink from "./NavBarLink";
import "./navbarStyles.css";
import { connect } from "react-redux";
import { fetchAllCategories } from "../../actions/categoriesActions";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.props.fetchAllCategories();
  }

  render() {
    return (
      <div className="nav-bar-wrapper">
        <div className="nav-bar">
          <div className="nav-bar-content">
            <div>
              {this.props.categories.items.length > 0 &&
                this.props.categories.items.map((category, i) => {
                  return (
                    <MyNavBarLink
                      key={category.name}
                      name={category.name}
                      isSelected={
                        this.props.categories.selectedCategory === category.name
                      }
                    />
                  );
                })}
            </div>
            <Logo />
            <div className="flex">
              <CurrencyOptions />
              <CartNav />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  fetchAllCategories: PropTypes.func.isRequired,
  categories: PropTypes.object,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
  // selectedCategory: state.categories.selectedCategory,
});

export default connect(mapStateToProps, { fetchAllCategories })(NavBar);
