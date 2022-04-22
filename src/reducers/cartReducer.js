import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
} from "../actions/types";

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return { items: [...state.items, action.payload] };

    case REMOVE_PRODUCT_FROM_CART:
      return {
        ...state,
      };

    default:
      return state;
  }
};
export default cartReducer;
