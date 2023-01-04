import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions';
import '../styles/Table.css';

class Table extends React.Component {
  removeExpense = (id) => {
    const { expenses, delExpense } = this.props;
    const removeExpense = expenses.filter((item) => item.id !== id);
    delExpense(removeExpense);
  };

  render() {
    const { expenses, editExpense } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        {expenses.map((item) => (
          <tbody key={ item.id }>
            <tr>
              <td>{item.description}</td>
              <td>{item.tag}</td>
              <td>{item.method}</td>
              <td>{`${item.value}.00`}</td>
              <td>{item.exchangeRates[item.currency].name}</td>
              <td>{Number(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
              <td>{(item.value * item.exchangeRates[item.currency].ask).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button
                  className="editarDespesa"
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => editExpense({
                    id: item.id,
                    value: item.value,
                    description: item.description,
                    currency: item.currency,
                    method: item.method,
                    tag: item.tag,
                  }) }
                >
                  Editar
                </button>
                <button
                  className="excluirDespesa"
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.removeExpense(item.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delExpense: (payload) => dispatch(deleteExpense(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
