import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StudentRegister from '../Auth/StudentRegister';
import { MemoryRouter } from 'react-router-dom';

// Mocking fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('StudentRegister', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <StudentRegister />
      </MemoryRouter>
    );
  });

  test('renders the registration form and handles input changes', () => {
    const usernameInput = screen.getByLabelText(/Username/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(usernameInput, { target: { value: 'TestUser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password1!' } });

    expect(usernameInput.value).toBe('TestUser');
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('Password1!');
  });

  test('shows an error message when submitting the form with empty fields', async () => {
    const submitButton = screen.getByRole('button', { name: /Register/i });

    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(screen.getByText('All fields are required')).toBeInTheDocument()
    );
  });

  test('shows an error message for invalid password', async () => {
    const usernameInput = screen.getByLabelText(/Username/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Register/i });

    fireEvent.change(usernameInput, { target: { value: 'TestUser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } }); // Invalid password

    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(screen.getByText('Password must be at least 6 characters long, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.')).toBeInTheDocument()
    );
  });

  test('shows error message on registration failure', async () => {
    // Mock fetch response for failed registration
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Registration failed' }),
    });

    const usernameInput = screen.getByLabelText(/Username/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Register/i });

    fireEvent.change(usernameInput, { target: { value: 'TestUser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
    fireEvent.click(submitButton);

    // Wait for error message to appear
    await waitFor(() =>
      expect(screen.getByText('Registration failed')).toBeInTheDocument()
    );
  });
});
