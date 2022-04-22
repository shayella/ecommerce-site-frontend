import { gql } from "@apollo/client";
import { client } from "..";
import { fetchProductByCategory } from "./productActions";
import { FETCH_ALL_CATEGORIES, SET_SELECTED_CATEGORY } from "./types";

export const fetchAllCategories = () => (dispatch) => {
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
      console.log("IN ACTION RESULT ", result.data.categories);
      fetchProductByCategory(result.data.categories[0].name);

      dispatch({
        type: FETCH_ALL_CATEGORIES,
        payload: {
          categories: result.data.categories,
          selectedCategory: result.data.categories[0].name,
        },
      });

      dispatch(fetchProductByCategory(result.data.categories[0].name));
    });
};

export const changeSelectedCategory = (categoryName) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_CATEGORY,
    payload: {
      selectedCategory: categoryName,
    },
  });
};
