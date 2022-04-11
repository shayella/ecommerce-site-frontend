import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class MyNavBarLink extends Component {
  render() {
    return (
      <NavLink
        to={`category/${this.props.name}`}
        className={({ isActive }) => (isActive ? "link link-active" : "link")}
      >
        {this.props.name}
      </NavLink>
    );
  }
}

export default MyNavBarLink;
