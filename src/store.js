import { createStore, applyMiddleware, compose } from "redux";
// import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["categories", "currencies", "cart"],
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  pReducer,
  // rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export const persistor = persistStore(store);

// const store = configureStore({
//   reducer: {
//     rootReducer,
//   },
// });

export default store;
