import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Paǵina principal', () => {
  test('1 - Verifica se o botão com e-mail e senha estão presentes na tela', () => {
    const emailIdTest = 'email-input';
    const passwordIdTest = 'password-input';
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailIdTest);
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByTestId(passwordIdTest);
    expect(passwordInput).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('2 - Verifica se ao preencher o formulaŕio e após clicar no botão, a página é redirecionada para /carteira', () => {
    const emailIdTest = 'email-input';
    const passwordIdTest = 'password-input';
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailIdTest);
    const passwordInput = screen.getByTestId(passwordIdTest);
    const button = screen.getByRole('button');
    userEvent.type(emailInput, 'renanbf1992@outlook.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
  });
});
