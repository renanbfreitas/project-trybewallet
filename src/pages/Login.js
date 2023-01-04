import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import saveLogin from '../redux/actions/index';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      buttonIsDisabled: true,
    };
  }

  inputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.validateForm());
  };

  validateForm = () => {
    const { email, password } = this.state;
    const SIX = 6;
    const regexEmail = /\S+@\S+\.\S+/;
    const validadeEmail = regexEmail.test(email);
    const validadePassword = password.length >= SIX;
    if (validadeEmail && validadePassword) {
      this.setState({ buttonIsDisabled: false });
    } else {
      this.setState({ buttonIsDisabled: true });
    }
  };

  redirect = () => {
    const { history, loginInfo } = this.props;
    const { email } = this.state;
    loginInfo({ email });
    history.push('/carteira');
  };

  render() {
    const { email, password, buttonIsDisabled } = this.state;
    return (
      <form>
        <div>
          <label htmlFor="email" className="email">
            <input
              id="email"
              name="email"
              value={ email }
              onChange={ this.inputChange }
              data-testid="email-input"
              placeholder="E-mail"
              className="email"
            />
          </label>
        </div>
        <div>
          <label htmlFor="password" className="senha">
            <input
              id="password"
              name="password"
              value={ password }
              type={ password }
              onChange={ this.inputChange }
              data-testid="password-input"
              placeholder="Senha"
              className="senha"
            />
          </label>
        </div>
        <div className="buttonEntrar">
          <button
            type="button"
            disabled={ buttonIsDisabled }
            onClick={ this.redirect }
            className="buttonEntrar"
          >
            Entrar
          </button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  loginInfo: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  loginInfo: (payload) => dispatch(saveLogin(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
