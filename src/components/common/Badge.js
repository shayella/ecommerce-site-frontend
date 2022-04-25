import React, { Component } from "react";

class Badge extends Component {
  render() {
    return (
      <div className="badge">
        <span className="badge-value">{this.props.value}</span>
      </div>
    );
  }
}

export default Badge;
