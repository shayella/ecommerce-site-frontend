import React, { Component } from "react";

class CurrencyOptions extends Component {
  render() {
    return (
      <div className="currency-container">
        <p className="currency-icon">$</p>
        <p>
          <i className="fa fa-angle-down" aria-hidden="true"></i>
        </p>
      </div>
    );
  }
}

export default CurrencyOptions;
