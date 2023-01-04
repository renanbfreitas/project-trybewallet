const initialState = {
  currencies: [],
  expenses: [],
  isFetching: false,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case 'SUCESS_REQUEST':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'REQUEST':
    return {
      ...state,
    };
  case 'SUCESS_REQUEST_SAVE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, ...action.expense],
    };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: [...action.payload],
    };
  default:
    return state;
  }
};

export default wallet;
