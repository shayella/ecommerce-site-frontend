import { client } from "..";
import { GET_PRODUCTS_BY_CATEGORY_Q } from "../queries/allQueries";
import { FETCH_PRODUCTS_BY_CATEGORY } from "./types";

export const fetchProductByCategory = (categoryName) => (dispatch) => {
  client
    .query({
      query: GET_PRODUCTS_BY_CATEGORY_Q,
      variables: {
        input: { title: categoryName },
      },
    })
    .then((result) => {
      dispatch({
        type: FETCH_PRODUCTS_BY_CATEGORY,
        payload: result.data.category.products,
      });
    });
};
