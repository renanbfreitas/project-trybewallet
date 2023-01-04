const saveLogin = ({ email }) => ({
  type: 'LOGIN',
  email,
});

const failedRequest = (error) => ({ type: 'FAILED_REQUEST', error });

const sucessRequest = (payload) => ({ type: 'SUCESS_REQUEST', payload });

const requestAPI = () => ({ type: 'REQUEST', isFetching: true });

const sucessRequestSaveExpense = (expense) => ({
  type: 'SUCESS_REQUEST_SAVE_EXPENSE',
  expense,
});

export function getCurrencies() {
  return async (dispatch) => {
    dispatch(requestAPI);
    try {
      const result = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await result.json();
      const currencies = Object.entries(data).map((item) => item[0])
        .filter((item) => item !== 'USDT');
      dispatch(sucessRequest(currencies));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}

export const saveExpense = ({
  valueInput,
  descriptionInput,
  currencyInput,
  methodInput,
  tagInput,
  expenses,
}) => (
  async (dispatch) => {
    try {
      const result = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await result.json();
      const expense = [{
        id: expenses.length,
        value: valueInput,
        description: descriptionInput,
        currency: currencyInput,
        method: methodInput,
        tag: tagInput,
        exchangeRates: data,
      }];
      dispatch(sucessRequestSaveExpense(expense));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  }
);

export const deleteExpense = (payload) => ({
  type: 'DELETE_EXPENSE',
  payload,
});

export default saveLogin;
