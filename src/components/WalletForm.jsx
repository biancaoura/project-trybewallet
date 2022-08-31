import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, arrayOf, string, bool, number, oneOfType, shape } from 'prop-types';
import { addExpense, fetchCurrency, editExpense } from '../redux/actions';
import currencyAPI from '../helpers/currencyAPI';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrency());
  }

  componentDidUpdate(prevProps) {
    const { isEditing } = this.props;
    if (prevProps.isEditing !== isEditing) this.handleEdit();
  }

  handleEdit = () => {
    const { isEditing, editingId, expenses } = this.props;

    if (isEditing) {
      const editingExpense = expenses.find(({ id }) => id === editingId);
      this.setState({ ...editingExpense });
    } else {
      this.setState({
        value: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { dispatch, isEditing, expenses } = this.props;
    const { id } = this.state;

    if (isEditing) {
      dispatch(editExpense(this.state));
      this.setState({ id: expenses.length });
    } else {
      const data = await currencyAPI();
      this.setState({ exchangeRates: data });

      dispatch(addExpense(this.state));
      this.setState({ id: id + 1, value: '', description: '' });
    }
  };

  render() {
    const { currencies, isEditing } = this.props;
    const { value, currency,
      method, tag, description } = this.state;

    return (
      <section
        className="box is-flex is-justify-content-space-around is-align-items-center"
      >
        <label htmlFor="value">
          Valor
          <input
            type="number"
            name="value"
            id="value"
            placeholder="Valor da despesa"
            value={ value }
            onChange={ this.handleChange }
            className="input"
          />
        </label>

        <label htmlFor="currency">
          Moeda
          <select
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
            className="input"
          >
            { currencies.map((el) => (
              <option key={ el } value={ el }>
                {el}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="method">
          Método de pagamento
          <select
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleChange }
            className="input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Tag
          <select
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
            className="input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <label htmlFor="description">
          Descrição
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Descrição"
            value={ description }
            onChange={ this.handleChange }
            className="input"
          />
        </label>

        <button
          type="button"
          onClick={ this.handleClick }
          className="button is-info"
        >
          { isEditing ? 'Editar despesa' : 'Adicionar despesa' }

        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

WalletForm.propTypes = {
  dispatch: func.isRequired,
  currencies: arrayOf(string).isRequired,
  isEditing: bool.isRequired,
  editingId: oneOfType([number, string]).isRequired,
  expenses: arrayOf(shape()).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
