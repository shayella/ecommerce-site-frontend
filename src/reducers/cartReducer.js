import {
  ADD_PRODUCT_TO_CART,
  DECREASE_PRODUCT_COUNT_IN_CART,
  INCREASE_PRODUCT_COUNT_IN_CART,
} from "../actions/types";

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      console.log(
        "EXISTS ",
        state.items.some(
          (item) =>
            item.id === action.payload.id &&
            JSON.stringify(item.selectedAttributes) ===
              JSON.stringify(action.payload.selectedAttributes)
        )
      );
      // Check if product exists, and the selected attributes are the same,
      if (
        state.items.some(
          (item) =>
            item.id === action.payload.id &&
            JSON.stringify(item.selectedAttributes) ===
              JSON.stringify(action.payload.selectedAttributes)
        )
      ) {
        //  If product already exists increase the count of the product
        let newItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, count: item.count + 1 }
            : item
        );
        alert(
          action.payload.brand +
            " " +
            action.payload.name +
            " has been added to cart successfully."
        );
        return { items: [...newItems] };
      } else {
        alert(
          action.payload.brand +
            " " +
            action.payload.name +
            " has been added to cart"
        );

        return { items: [...state.items, action.payload] };
      }
    case INCREASE_PRODUCT_COUNT_IN_CART:
      let newItems = state.items.map((item) =>
        item.id === action.payload.id &&
        JSON.stringify(item.selectedAttributes) ==
          JSON.stringify(action.payload.selectedAttributes)
          ? { ...item, count: item.count + 1 }
          : item
      );
      return { items: [...newItems] };

    case DECREASE_PRODUCT_COUNT_IN_CART:
      if (action.payload.count <= 1) {
        let newItems = state.items.filter((item) => {
          if (item.id !== action.payload.id) {
            return item;
          } else if (
            item.id === action.payload.id &&
            JSON.stringify(item.selectedAttributes) !==
              JSON.stringify(action.payload.selectedAttributes)
          ) {
            return item;
          }
        });
        return { items: [...newItems] };
      } else {
        let newItems = state.items.map((item) =>
          item.id === action.payload.id &&
          JSON.stringify(item.selectedAttributes) ===
            JSON.stringify(action.payload.selectedAttributes)
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
