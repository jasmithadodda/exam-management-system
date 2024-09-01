import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import StudentRegister from '../Auth/StudentRegister';

describe('StudentRegister', () => {
  beforeEach(() => {
    // Wrap the component in MemoryRouter
    render(
      <MemoryRouter>
        <StudentRegister />
      </MemoryRouter>
    );
  });

  it('renders the registration form and handles input changes', () => {
    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(nameInput.value).toBe('Test User');
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('shows an error message when submitting the form with empty fields', () => {
    const submitButton = screen.getByRole('button', { name: /Register/i });

    fireEvent.click(submitButton);

    const errorMessage = screen.getByText(/All fields are required/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('navigates to the dashboard upon successful registration', () => {
    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Register/i });

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // You can mock the navigation or use a mock function to verify navigation
    // For example:
    // expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});
