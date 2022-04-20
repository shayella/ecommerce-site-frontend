import { gql } from "@apollo/client";
import React, { Component } from "react";
import { client } from "../..";

class CurrencyOptionsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      selectedCurrency: {},
    };
  }

  getAllSupportedCurrencies() {
    client
      .query({
        query: gql`
          {
            currencies {
              label
              symbol
            }
          }
        `,
      })
      .then((result) => {
        this.setState({
          currencies: result.data.currencies,
          selectedCurrency: result.data.currencies[0],
        });
      });
  }

  componentDidMount() {
    this.getAllSupportedCurrencies();
  }

  render() {
    return (
      <div className={this.props.showOptions ? "currency-modal" : "hidden"}>
        {this.state.currencies.map((currency, i) => {
          return (
            <p key={i} className="currency">
              {currency.symbol} {currency.label}
            </p>
          );
        })}
      </div>
    );
  }
}

export default CurrencyOptionsModal;
