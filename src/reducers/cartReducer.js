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
      // Check if product exists
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
        //  If product already exists and the selected attributes are the same, use increase the count of the product
        let newItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, count: item.count + 1 }
            : item
        );
        return { items: [...newItems] };
      } else {
        return { items: [...state.items, action.payload] };
      }

    // console.log("Payload ", action.payload.id);
    // let productInCart = state.items.filter(
    //   (item) => (item.id = action.payload.id)
    // )[0];

    // console.log("Product in cart ", productInCart);

    // if (productInCart !== undefined) {
    //   let newItems = state.items.map((item) =>
    //     item.id === action.payload.id
    //       ? { ...item, count: item.count + 1 }
    //       : item
    //   );
    //   return { items: [...newItems] };
    // } else {
    //   return { items: [...state.items, action.payload] };
    // }

    case REMOVE_PRODUCT_FROM_CART:
      return {
        ...state,
      };

    default:
      return state;
  }
};
export default cartReducer;
