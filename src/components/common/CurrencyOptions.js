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
  }

  toggleCurrencyModal() {
    console.log("Clicked");
    this.setState((prevState) => ({
      isCurrenyModalOpen: !prevState.isCurrenyModalOpen,
    }));
  }

  render() {
    return (
      <>
        <div className="currency-container" onClick={this.toggleCurrencyModal}>
          <p className="currency-icon">{this.props.selectedCurrency.symbol}</p>
          <p className="caret-icon">
            <i
              className={
                this.state.isCurrenyModalOpen
                  ? "fa fa-angle-up"
                  : "fa fa-angle-down"
              }
              aria-hidden="true"
            ></i>
          </p>
        </div>
        {/* {this.state.isCurrenyModalOpen ? <CurrencyOptionsModal /> : <></>} */}
        <CurrencyOptionsModal
          showOptions={this.state.isCurrenyModalOpen}
          toggleModal={this.toggleCurrencyModal}
        />
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
