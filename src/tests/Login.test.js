import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

beforeEach(() => renderWithRouterAndRedux(<App />));

const { history } = renderWithRouterAndRedux(<App />);

const VALID_EMAIL = 'valid@email.com';
const VALID_PASSWORD = 'thirteen';

describe('test Login component', () => {
  it('the page should render at "/"', () => {
    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });

  describe('testing inputs', () => {
    it('should render inputs for email and password', () => {
      const emailInput = screen.getByPlaceholderText(/e-mail/i);
      const passwordInput = screen.getByPlaceholderText(/senha/i);

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });

    it('button should only be enabled if both e-mail and password are valid', () => {
      const emailInput = screen.getByPlaceholderText(/e-mail/i);
      const passwordInput = screen.getByPlaceholderText(/senha/i);
      const loginBtn = screen.getByRole('button', { name: /entrar/i });

      const INVALID_EMAIL = 'invalid';
      const INVALID_PASSWORD = 'four';

      userEvent.type(emailInput, INVALID_EMAIL);
      userEvent.type(passwordInput, INVALID_PASSWORD);

      expect(loginBtn).toBeDisabled();

      userEvent.type(emailInput, VALID_EMAIL);
      userEvent.type(passwordInput, VALID_PASSWORD);

      expect(loginBtn).toBeEnabled();
    });
  });

  it('clicking the button should go to /carteira', () => {
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);

    expect(loginBtn).toBeEnabled();

    userEvent.click(loginBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
});
