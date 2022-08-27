import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <section>
        <p data-testid="email-field">{email}</p>
        <p>
          Despesa total:
          <span data-testid="total-field">
            0
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </p>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
});

Header.propTypes = {
  email: string.isRequired,
};

export default connect(mapStateToProps)(Header);
