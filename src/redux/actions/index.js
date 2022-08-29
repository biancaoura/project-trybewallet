import currencyAPI from '../../helpers/currencyAPI';

export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';

export const GET_CURRENCY = 'GET_CURRENCY';
export const GET_CURRENCY_ERROR = 'GET_CURRENCY_ERROR';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const submitLoginForm = (email) => ({
  type: LOGIN_SUBMIT,
  email,
});

const getCurrency = (currencies) => ({ type: GET_CURRENCY, currencies });
const errorCurrency = (error) => ({ type: GET_CURRENCY_ERROR, error });

export const addExpense = (expense) => ({ type: ADD_EXPENSE, expense });

export const deleteExpense = (expense) => ({ type: DELETE_EXPENSE, expense });

export const fetchCurrency = () => async (dispatch) => {
  try {
    const currencies = await currencyAPI();
    dispatch(getCurrency(currencies));
  } catch (e) {
    dispatch(errorCurrency(e.message));
  }
};
