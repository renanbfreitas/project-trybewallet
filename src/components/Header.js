import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/Header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  updateValue = () => {
    const { expenses } = this.props;
    let totalSum = 0;
    expenses.forEach((item) => {
      totalSum += Number(item.value) * Number(item.exchangeRates[item.currency].ask);
    });
    return totalSum.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field" className="email-field">{email}</p>
        <p data-testid="total-field" className="total">{this.updateValue()}</p>
        <p data-testid="header-currency-field" className="moeda">BRL</p>
        <div className="trybeWallet">TrybeWallet</div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  totalValue: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
