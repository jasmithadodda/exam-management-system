/* This JavaScript code snippet is a test suite for the `FacultyRegister` component. It uses Jest and
React Testing Library for testing React components. */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FacultyRegister from '../Auth/FacultyRegister';
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

describe('FacultyRegister', () => {
  test('renders the registration form and handles input changes', () => {
    render(
      <MemoryRouter>
        <FacultyRegister />
      </MemoryRouter>
    );

    // Check if the form elements are rendered
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password1!' } });

    // Verify input values
    expect(screen.getByPlaceholderText('Username')).toHaveValue('testuser');
    expect(screen.getByPlaceholderText('Email')).toHaveValue('test@example.com');
    expect(screen.getByPlaceholderText('Password')).toHaveValue('Password1!');
  });

  test('displays error message for invalid password', async () => {
    render(
      <MemoryRouter>
        <FacultyRegister />
      </MemoryRouter>
    );

    // Simulate user input with invalid password
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } }); // Invalid password

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Wait for error message to appear
    await waitFor(() =>
      expect(screen.getByText('Password must be at least 6 characters long, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.')).toBeInTheDocument()
    );
  });

  test('displays error message on registration failure', async () => {
    // Mock fetch response for failed registration
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Registration failed' }),
    });

    render(
      <MemoryRouter>
        <FacultyRegister />
      </MemoryRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password1!' } });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Wait for error message to appear
    await waitFor(() => expect(screen.getByText('Registration failed')).toBeInTheDocument());
  });

  test('displays error message on incomplete fields', async () => {
    // Mock fetch response for failed registration due to validation
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'All fields are required' }),
    });

    render(
      <MemoryRouter>
        <FacultyRegister />
      </MemoryRouter>
    );

    // Simulate user input with missing fields
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: '' } }); // Leave email empty
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password1!' } });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Wait for error message to appear
    await waitFor(() => expect(screen.getByText('All fields are required')).toBeInTheDocument());
  });
});
