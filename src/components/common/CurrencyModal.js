import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  fetchAllCurrencies,
  changeSelectedCurrency,
} from "../../actions/currencyActions";

class CurrencyOptionsModal extends Component {
  constructor(props) {
    super(props);
    this.props.fetchAllCurrencies();
  }

  render() {
    const currencies = this.props.currencies.items.map((currency, i) => {
      return (
        <p
          key={i}
          className="currency"
          onClick={() => {
            this.props.changeSelectedCurrency(currency);
            this.props.toggleModal();
          }}
        >
          {currency.symbol} {currency.label}
        </p>
      );
    });

    return (
      <div className={this.props.showOptions ? "currency-modal" : "hidden"}>
        {currencies}
      </div>
    );
  }
}

CurrencyOptionsModal.propTypes = {
  fetchAllCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.object,
};

const mapStateToProps = (state) => ({
  currencies: state.currencies,
});

export default connect(mapStateToProps, {
  fetchAllCurrencies,
  changeSelectedCurrency,
})(CurrencyOptionsModal);
