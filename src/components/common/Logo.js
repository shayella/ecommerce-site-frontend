import React, { Component } from "react";
import logo from "../../images/logo.png";
class Logo extends Component {
  render() {
    return (
      <p className="logo">
        <a href="#">
          <img src={logo} alt="logo" />
        </a>
      </p>
    );
  }
}

export default Logo;
