import {
  ADD_PRODUCT_TO_CART,
  DECREASE_PRODUCT_COUNT_IN_CART,
  INCREASE_PRODUCT_COUNT_IN_CART,
  REMOVE_PRODUCT_FROM_CART,
} from "../actions/types";

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      // Check if product exists, and the selected attributes are the same,
      if (
        state.items.some(
          (e) =>
            e.id === action.payload.id &&
            Object.keys(e.selectedAttributes).every(
              (key) =>
                e.selectedAttributes[key] ===
                action.payload.selectedAttributes[key]
            )
        )
      ) {
        //  If product already exists increase the count of the product
        let newItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, count: item.count + 1 }
            : item
        );
        return { items: [...newItems] };
      } else {
        return { items: [...state.items, action.payload] };
      }

    // case REMOVE_PRODUCT_FROM_CART:
    //   return {
    //     ...state,
    //   };

    case INCREASE_PRODUCT_COUNT_IN_CART:
      let newItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, count: item.count + 1 }
          : item
      );
      return { items: [...newItems] };

    case DECREASE_PRODUCT_COUNT_IN_CART:
      if (action.payload.count <= 1) {
        let newItems = state.items.filter(
          (item) =>
            item.id !== action.payload.id &&
            Object.keys(item.selectedAttributes).every(
              (key) =>
                item.selectedAttributes[key] !==
                action.payload.selectedAttributes[key]
            )
        );
        return { items: [...newItems] };
      } else {
        let newItems = state.items.map((item) =>
          item.id === action.payload.id &&
          Object.keys(item.selectedAttributes).every(
            (key) =>
              item.selectedAttributes[key] ===
              action.payload.selectedAttributes[key]
          )
            ? { ...item, count: item.count - 1 }
            : item
        );
        return { items: [...newItems] };
      }

    default:
      return state;
  }
};
export default cartReducer;
