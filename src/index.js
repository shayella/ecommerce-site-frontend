import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import NavBar from "./components/common/NavBar";
import ProductList from "./components/products/ProductList";

import reportWebVitals from "./reportWebVitals";
import ProductDetails from "./components/products/ProductDetails";
import MyCart from "./components/cart/MyCart";

const localGraphQL = "http://localhost:4000";
export const client = new ApolloClient({
  uri: localGraphQL,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route exact path="" element={<App />} />
          <Route
            exact
            path="category/:categoryname"
            element={<ProductList />}
          />
          <Route exact path="product/:id" element={<ProductDetails />} />
          <Route exact path="cart" element={<MyCart />} />
        </Routes>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
