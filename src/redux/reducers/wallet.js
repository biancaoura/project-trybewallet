import {
  GET_CURRENCY,
  GET_CURRENCY_ERROR,
  ADD_EXPENSE,
  DELETE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, { type, currencies, error, expense }) => {
  switch (type) {
  case GET_CURRENCY:
    return {
      ...state,
      currencies: Object.keys(currencies),
    };

  case GET_CURRENCY_ERROR:
    return { ...state, error };

  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, expense],
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...expense],
    };

  default:
    return state;
  }
};

export default wallet;
