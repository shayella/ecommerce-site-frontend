import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from "./types";

export const addProductToCart = (product) => (dispatch) => {
  console.log("Product Id");
  dispatch({
    type: ADD_PRODUCT_TO_CART,
    payload: product,
  });
};

export const deleteProductToCart = (productId) => (dispatch) => {
  dispatch({
    type: REMOVE_PRODUCT_FROM_CART,
    payload: productId,
  });
};
