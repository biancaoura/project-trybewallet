import {
  GET_CURRENCY_SUCCESS,
  GET_CURRENCY_ERROR,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  SET_EDIT_EXPENSE,
  EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editingId: '',
  isEditing: false,
};

const wallet = (
  state = INITIAL_STATE,
  { type, currencies, error, expense, editingId },
) => {
  switch (type) {
  case GET_CURRENCY_SUCCESS:
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
      isEditing: false,
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...expense],
      isEditing: false,
    };

  case SET_EDIT_EXPENSE:
    return {
      ...state,
      editingId,
      isEditing: true,
    };

  case EDIT_EXPENSE:
    return {
      ...state,
      isEditing: false,
      expenses: state.expenses
        .map((el) => (el.id === state.editingId ? expense : { ...el })),
    };

  default:
    return state;
  }
};

export default wallet;
