import currencyAPI from '../../helpers/currencyAPI';

export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';

export const GET_CURRENCY = 'GET_CURRENCY';
export const GET_CURRENCY_ERROR = 'GET_CURRENCY_ERROR';
export const ADD_EXPENSES = 'ADD_EXPENSES';

export const submitLoginForm = (email) => ({
  type: LOGIN_SUBMIT,
  email,
});

const getCurrency = (currencies) => ({ type: GET_CURRENCY, currencies });
const errorCurrency = (error) => ({ type: GET_CURRENCY_ERROR, error });

export const addExpenses = (expenses) => ({ type: ADD_EXPENSES, expenses });

export const fetchCurrency = () => async (dispatch) => {
  try {
    const currencies = await currencyAPI();
    dispatch(getCurrency(currencies));
  } catch (e) {
    dispatch(errorCurrency(e.message));
  }
};
