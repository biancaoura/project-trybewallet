import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
import { submitLoginForm } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  validateEmail = (email) => (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i));

  enableButton = () => {
    const { email, password } = this.state;
    const minPassLength = 6;

    if (password.length >= minPassLength && this.validateEmail(email)) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.enableButton());
  };

  handleClick = (e) => {
    e.preventDefault();

    const { email } = this.state;
    const { history: { push }, dispatch } = this.props;

    dispatch(submitLoginForm(email));
    push('/carteira');
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div className="pt-6">
        <form className="box column is-two-fifths m-auto">
          <h1 className="title is-2">Login</h1>
          <div className="field">
            <label htmlFor="email" className="label">
              E-mail
              <input
                type="text"
                name="email"
                id="email"
                placeholder="exemplo@exemplo.com"
                value={ email }
                onChange={ this.handleChange }
                className="input"
              />
            </label>
          </div>
          <label htmlFor="password" className="label">
            Senha
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*******"
              value={ password }
              onChange={ this.handleChange }
              className="input"
            />
          </label>
          <button
            type="submit"
            onClick={ this.handleClick }
            disabled={ isDisabled }
            className={ isDisabled ? 'button is-white' : 'button is-success' }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: shape().isRequired,
  dispatch: func.isRequired,
};

export default connect()(Login);
