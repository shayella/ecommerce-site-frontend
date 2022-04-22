import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CartItemFullView from "./CartItemLarge";
import "./cart.css";
class MyCart extends Component {
  constructor(props) {
    super(props);
    this.state = { total: 0, qty: 0, tax: 0 };
  }

  calculateTotal() {
    let totalItems = 0;
    let totalAmount = 0;

    this.props.cart.items.forEach((item) => {
      console.log(item);
      let price = item.prices.filter(
        (price) => price.currency.symbol === this.props.selectedCurrency.symbol
      )[0];
      totalItems = totalItems + item.count;
      totalAmount = totalAmount + item.count * price.amount;
    });

    this.setState({ qty: totalItems, total: totalAmount });
  }

  componentDidMount() {
    this.calculateTotal();
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedCurrency !== prevProps.selectedCurrency) {
      this.calculateTotal();
    }
  }

  render() {
    return (
      <div className="my-cart-wrapper">
        <h1 className="cart-heading">Cart</h1>

        {this.props.cart &&
          this.props.cart.items.map((item) => {
            return <CartItemFullView key={item.id} product={item} />;
          })}

        {this.props.cart && this.props.cart.items.length <= 0 ? (
          <p className="total-value">
            Bag is empty. There not products in the cart
          </p>
        ) : (
          <div className="totals">
            <hr />
            <p className="total-label">
              Tax: <span className="total-value"></span>
            </p>
            <p className="total-label">
              Qty: <span className="total-value">{this.state.qty}</span>
            </p>
            <p className="total-label">
              Total:{" "}
              <span className="total-value">
                {this.props.selectedCurrency.symbol}
                {this.state.total}
              </span>
            </p>
          </div>
        )}
      </div>
    );
  }
}

MyCart.propTypes = {
  cart: PropTypes.object.isRequired,
  selectedCurrency: PropTypes.object,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  selectedCurrency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps)(MyCart);
