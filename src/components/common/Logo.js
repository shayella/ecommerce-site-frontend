import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
class Logo extends Component {
  render() {
    return (
      <div className="app-logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
    );
  }
}

export default Logo;
