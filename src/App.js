import React, { Component } from "react";
import { gql } from "@apollo/client";
import NavBar from "./components/common/NavBar";
import { client } from ".";

class App extends Component {
  constructor() {
    super();
    this.state = { categories: [], isLoading: false, selectedCategory: "" };
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

  componentDidMount() {
    this.fetchAllCategories();
  }

  render() {
    return "In App";
  }
}
export default App;
