import { gql } from "@apollo/client";
import { client } from "..";
import { FETCH_PRODUCTS_BY_CATEGORY } from "./types";

export const fetchProductByCategory = (categoryName) => (dispatch) => {
  const query = gql`
    query CategoryProducts($input: CategoryInput) {
      category(input: $input) {
        name
        products {
          id
          name
          brand
          attributes {
            name
            type
            items {
              displayValue
              value
            }
          }
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
        input: { title: categoryName },
      },
    })
    .then((result) => {
      console.log("IN ACTION RESULT ", result.data.categories);
      dispatch({
        type: FETCH_PRODUCTS_BY_CATEGORY,
        payload: result.data.category.products,
      });
    });
};
