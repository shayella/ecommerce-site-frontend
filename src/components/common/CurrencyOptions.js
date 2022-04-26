import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CurrencyOptionsModal from "./CurrencyModal";

class CurrencyOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCurrenyModalOpen: false,
    };
    this.toggleCurrencyModal = this.toggleCurrencyModal.bind(this);
    this.closeCurrencyModal = this.closeCurrencyModal.bind(this);
  }

  toggleCurrencyModal() {
    this.setState((prevState) => ({
      isCurrenyModalOpen: !prevState.isCurrenyModalOpen,
    }));
  }

  closeCurrencyModal() {
    this.setState({
      isCurrenyModalOpen: false,
    });
  }

  render() {
    return (
      <>
        <div
          className="currency-container"
          onClick={(e) => {
            e.stopPropagation();
            this.toggleCurrencyModal();
          }}
        >
          <span className="currency-icon">
            {this.props.selectedCurrency.symbol}
          </span>
          <span className="caret-icon">
            <i
              className={
                this.state.isCurrenyModalOpen
                  ? "fa fa-angle-up"
                  : "fa fa-angle-down"
              }
              aria-hidden="true"
            ></i>
          </span>
        </div>
        <div
          className={
            this.state.isCurrenyModalOpen ? "currency-overlay" : "hidden"
          }
          onClick={this.toggleCurrencyModal}
        >
          <CurrencyOptionsModal
            showOptions={this.state.isCurrenyModalOpen}
            toggleModal={this.toggleCurrencyModal}
            closeModal={this.closeCurrencyModal}
          />
        </div>
      </>
    );
  }
}

CurrencyOptions.propTypes = {
  selectedCurrency: PropTypes.object,
};

const mapStateToProps = (state) => ({
  selectedCurrency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps)(CurrencyOptions);
