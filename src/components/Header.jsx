import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape } from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    const getRates = expenses.reduce((total, curr) => {
      const currentCurrency = curr.exchangeRates[curr.currency];
      const currentRate = currentCurrency.ask * curr.value;

      const rate = Number((currentRate).toFixed(2));
      return Number(total) + rate;
    }, '0.00');

    return (
      <header>
        <p>{email}</p>
        <p>
          Despesa total:
          <span>
            {getRates}
          </span>
          <span>
            BRL
          </span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

Header.propTypes = {
  email: string.isRequired,
  expenses: arrayOf(shape()).isRequired,
};

export default connect(mapStateToProps)(Header);
