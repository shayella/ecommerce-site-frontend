import { client } from "..";
import { GET_ALL_CATEGORIES_Q } from "../queries/allQueries";
import { fetchProductByCategory } from "./productActions";
import { FETCH_ALL_CATEGORIES, SET_SELECTED_CATEGORY } from "./types";

export const fetchAllCategories = () => (dispatch) => {
  client
    .query({
      query: GET_ALL_CATEGORIES_Q,
    })
    .then((result) => {
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
