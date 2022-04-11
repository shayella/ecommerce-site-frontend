import React, { Component } from "react";
import CartNav from "./CartNav";
import CurrencyOptions from "./CurrencyOptions";
import Logo from "./Logo";
import MyNavBarLink from "./NavBarLink";
import { gql } from "@apollo/client/core";
import "./navbarStyles.css";
import { client } from "../..";

class NavBar extends Component {
  constructor() {
    super();
    this.state = { categories: [], isLoading: false, selectedCategory: "" };
    this.changeSelectedCategory = this.changeSelectedCategory.bind(this);
  }

  fetchAllCategories() {
    client
      .query({
        query: gql`
          {
            categories {
              name
            }
          }
        `,
      })
      .then((result) => {
        console.log("RESULT ", result.data.categories);
        this.setState({
          categories: result.data.categories,
          selectedCategory: result.data.categories[0].name,
        });
      });
  }

  changeSelectedCategory(categoryName) {
    console.log("Selected Category ", categoryName);
    this.setState({ selectedCategory: categoryName });
  }

  componentDidMount() {
    this.fetchAllCategories();
  }

  render() {
    return (
      <div className="nav-bar">
        <div>
          {this.state.categories.map((category, i) => {
            return (
              <MyNavBarLink
                key={category.name}
                name={category.name}
                selected={this.state.selectedCategory}
                handleClick={this.changeSelectedCategory}
              />
            );
          })}
        </div>
        <div>
          <Logo />
        </div>
        <div className="flex">
          <CurrencyOptions />
          <CartNav />
        </div>
      </div>
    );
  }
}

export default NavBar;
