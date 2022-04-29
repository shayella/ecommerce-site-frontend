import React, { Component } from "react";
import PropTypes from "prop-types";

class Badge extends Component {
  render() {
    return (
      <div className="badge">
        <span className="badge-value">{this.props.value}</span>
      </div>
    );
  }
}

Badge.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Badge;
