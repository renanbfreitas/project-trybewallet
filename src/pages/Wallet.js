import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies, saveExpense, deleteExpense } from '../redux/actions';
import Header from '../components/Header';
import Table from '../components/Table';
import '../styles/Wallet.css';

const ALIMENTACAO = 'Alimentação';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      valueInput: '',
      descriptionInput: '',
      currencyInput: 'USD',
      methodInput: 'Dinheiro',
      tagInput: ALIMENTACAO,
      walletForm: false,
      idToEdit: 0,
    };
  }

  componentDidMount() {
    const { getCurrenciesWallet } = this.props;
    getCurrenciesWallet();
  }

  inputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  addExpenses = () => {
    const { saveExpensesWallet, expenses } = this.props;
    const {
      valueInput,
      descriptionInput,
      currencyInput,
      methodInput,
      tagInput,
    } = this.state;
    this.setState({
      valueInput: '',
      descriptionInput: '',
      currencyInput: 'USD',
      methodInput: 'Dinheiro',
      tagInput: ALIMENTACAO,
    }, () => {
      saveExpensesWallet({
        valueInput,
        descriptionInput,
        currencyInput,
        methodInput,
        tagInput,
        expenses,
      });
    });
  };

  editExpense = ({ id, value, description, currency, method, tag }) => {
    this.setState({
      valueInput: value,
      descriptionInput: description,
      currencyInput: currency,
      methodInput: method,
      tagInput: tag,
      walletForm: true,
      idToEdit: id,
    });
  };

  finishEditing = (id) => {
    const { expenses, delExpense } = this.props;
    const {
      valueInput,
      descriptionInput,
      currencyInput,
      methodInput,
      tagInput,
    } = this.state;
    expenses[id].value = valueInput;
    expenses[id].description = descriptionInput;
    expenses[id].currency = currencyInput;
    expenses[id].method = methodInput;
    expenses[id].tag = tagInput;
    delExpense(expenses);
    this.setState({ walletForm: false, idToEdit: null });
  };

  render() {
    const {
      valueInput,
      descriptionInput,
      currencyInput,
      methodInput,
      tagInput,
      walletForm,
      idToEdit,
    } = this.state;

    const { currencies } = this.props;
    return (
      <div>
        <Header />
        <form>
          <label htmlFor="value-input" className="valorName">
            Valor:
            <input
              className="valor"
              id="value-input"
              name="valueInput"
              data-testid="value-input"
              type="number"
              onChange={ this.inputChange }
              value={ valueInput }
            />
          </label>
          <label htmlFor="description-input" className="descriçaoName">
            Descrição:
            <input
              className="descriçao"
              id="description-input"
              name="descriptionInput"
              data-testid="description-input"
              type="text"
              onChange={ this.inputChange }
              value={ descriptionInput }
            />
          </label>
          <label htmlFor="currency-input" className="moedaName">
            Moeda:
            <select
              className="moedaValue"
              onChange={ this.inputChange }
              value={ currencyInput }
              name="currencyInput"
              id="currency-input"
              data-testid="currency-input"
            >
              {currencies.map((currencie, index) => (
                <option value={ currencie.toString() } key={ index }>
                  { currencie }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            <select
              className="method-input"
              onChange={ this.inputChange }
              value={ methodInput }
              name="methodInput"
              id="method-input"
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            <select
              className="tag-input"
              onChange={ this.inputChange }
              value={ tagInput }
              name="tagInput"
              id="tag-input"
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          {walletForm ? (
            <button
              className="buttonEddDespesa"
              type="button"
              onClick={ () => this.finishEditing(idToEdit) }
            >
              Editar Despesa
            </button>
          ) : (
            <button
              className="buttonAddDespesa"
              type="button"
              onClick={ this.addExpenses }
            >
              Adicionar Despesa
            </button>
          )}
        </form>
        <Table editExpense={ this.editExpense } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesWallet: () => dispatch(getCurrencies()),
  saveExpensesWallet: (currencie) => dispatch(saveExpense(currencie)),
  delExpense: (payload) => dispatch(deleteExpense(payload)),
});

Wallet.propTypes = {
  currencies: PropTypes.shape(),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
