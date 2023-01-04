import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies, saveExpense } from '../redux/actions';
import Header from './Header';
import Table from './Table';

const ALIMENTACAO = 'Alimentação';

class WalletForm extends React.Component {
  constructor() {
    super();

    this.state = {
      valueInput: '',
      descriptionInput: '',
      currencyInput: 'USD',
      methodInput: 'Dinheiro',
      tagInput: ALIMENTACAO,
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

  render() {
    const {
      valueInput,
      descriptionInput,
      currencyInput,
      methodInput,
      tagInput,
    } = this.state;

    const { currencies } = this.props;

    return (
      <div>
        <Header />
        <form>
          <label htmlFor="value-input">
            Valor:
            <input
              id="value-input"
              name="valueInput"
              data-testid="value-input"
              type="number"
              onChange={ this.inputChange }
              value={ valueInput }
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              id="description-input"
              name="descriptionInput"
              data-testid="description-input"
              type="text"
              onChange={ this.inputChange }
              value={ descriptionInput }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              onChange={ this.inputChange }
              value={ currencyInput }
              name="currencyInput"
              id="currency-input"
              data-testid="currency-input"
            >
              {currencies.map((currencie, index) => (
                <option value={ currencie.toString() } key={ index }>
                  {currencie}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            <select
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
          <button type="button" onClick={ () => console.log('test') }>
            Editar despesa
          </button>
        </form>
        <Table />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesWallet: () => dispatch(getCurrencies()),
  saveExpensesWallet: (currencie) => dispatch(saveExpense(currencie)),
});

WalletForm.propTypes = {
  currencies: PropTypes.shape(),
}.isRequired;

export default connect(null, mapDispatchToProps)(WalletForm);
