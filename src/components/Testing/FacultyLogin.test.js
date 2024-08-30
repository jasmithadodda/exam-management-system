import FacultyLogin from '../Auth/FacultyLogin';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
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

describe('FacultyLogin', () => {
  test('renders the login form and handles input changes', () => {
    render(
      <MemoryRouter>
        <FacultyLogin />
      </MemoryRouter>
    );

    // Check if the form elements are rendered
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    // Verify input values
    expect(screen.getByPlaceholderText('Email')).toHaveValue('test@example.com');
    expect(screen.getByPlaceholderText('Password')).toHaveValue('password123');
  });

  test('navigates to the faculty registration page when the link is clicked', () => {
    const navigate = jest.fn(); // Create a mock navigate function
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <FacultyLogin />
      </MemoryRouter>
    );

    // Simulate clicking the registration link
    fireEvent.click(screen.getByText(/click here to register/i));

    // Verify navigation
    expect(navigate).toHaveBeenCalledWith('/faculty-register');
  });

  test('logs in successfully with correct credentials', async () => {
    const navigate = jest.fn(); // Mock navigate function
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

    // Mock fetch response for successful login
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'dummy_token' }),
    });

    render(
      <MemoryRouter>
        <FacultyLogin />
      </MemoryRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Login'));

    // Wait for navigation to occur
    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/faculty-dashboard'));
  });

  test('displays error message on login failure', async () => {
    const navigate = jest.fn(); // Mock navigate function
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

    // Mock fetch response for failed login
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid credentials' }),
    });

    render(
      <MemoryRouter>
        <FacultyLogin />
      </MemoryRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Login'));

    // Wait for error message to appear
    await waitFor(() => expect(screen.getByText('Invalid credentials')).toBeInTheDocument());
  });

  test('displays error message when the email is correct but password is incorrect', async () => {
    const navigate = jest.fn(); // Mock navigate function
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

    // Mock fetch response for failed login due to incorrect password
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Incorrect password' }),
    });

    render(
      <MemoryRouter>
        <FacultyLogin />
      </MemoryRouter>
    );

    // Simulate user input with correct email and incorrect password
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Login'));

    // Wait for the error message to appear
    await waitFor(() => expect(screen.getByText('Incorrect password')).toBeInTheDocument());
  });

  test('displays error message when the email is incorrect but password is correct', async () => {
    const navigate = jest.fn(); // Mock navigate function
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

    // Mock fetch response for failed login due to incorrect email
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Incorrect email' }),
    });

    render(
      <MemoryRouter>
        <FacultyLogin />
      </MemoryRouter>
    );

    // Simulate user input with incorrect email and correct password
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Login'));

    // Wait for the error message to appear
    await waitFor(() => expect(screen.getByText('Incorrect email')).toBeInTheDocument());
  });
});
