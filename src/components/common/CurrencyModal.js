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
    const selectedCurrency = this.props.selectedCurrency;
    const currencies = this.props.currencies.items.map((currency, i) => {
      return (
        <p
          key={i}
          className={
            currency.label === selectedCurrency.label
              ? "currency selected-currency"
              : "currency"
          }
          onClick={(e) => {
            this.props.changeSelectedCurrency(currency);
            e.stopPropagation();
            this.props.closeModal();
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
  currencies: PropTypes.object.isRequired,
  selectedCurrency: PropTypes.object.isRequired,
  showOptions: PropTypes.bool.isRequired,
  changeSelectedCurrency: PropTypes.func.isRequired,
  closeModal: PropTypes.func,
};

const mapStateToProps = (state) => ({
  currencies: state.currencies,
  selectedCurrency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps, {
  fetchAllCurrencies,
  changeSelectedCurrency,
})(CurrencyOptionsModal);
