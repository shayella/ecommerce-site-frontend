import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
class PageNotFound extends Component {
  render() {
    return (
      <div className="centered">
        <h4>404 Error</h4>
        <h1>Opps! Page Not Found </h1>
        <Link className="back-link" to="/">
          Go back home :)
        </Link>
      </div>
    );
  }
}

export default PageNotFound;
