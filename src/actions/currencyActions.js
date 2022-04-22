import { gql } from "@apollo/client";
import { client } from "..";
import { GET_ALL_CURRENCIES, SET_SELECTED_CURRENCY } from "./types";

export const fetchAllCurrencies = () => (dispatch) => {
  client
    .query({
      query: gql`
        {
          currencies {
            label
            symbol
          }
        }
      `,
    })
    .then((result) => {
      dispatch({
        type: GET_ALL_CURRENCIES,
        payload: {
          currencies: result.data.currencies,
          selectedCurrency: result.data.currencies[0],
        },
      });
    });
};

export const changeSelectedCurrency = (selectedCurrency) => (dispatch) => {
  console.log("Changing currency", selectedCurrency);
  dispatch({
    type: SET_SELECTED_CURRENCY,
    payload: selectedCurrency,
  });
};
