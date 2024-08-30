import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './HomePage'; // Adjust the path as necessary

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('HomePage', () => {
  const mockedNavigate = jest.fn();

  beforeEach(() => {
    mockedNavigate.mockClear();
    require('react-router-dom').useNavigate.mockReturnValue(mockedNavigate);
  });

  test('renders the homepage title', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    const titleElement = screen.getByText(/Exam Management System/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders student login button with image', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    const studentButton = screen.getByRole('button', { name: /Student/i });
    expect(studentButton).toBeInTheDocument();

    const studentImage = screen.getByAltText('Student Logo');
    expect(studentImage).toBeInTheDocument();
    expect(studentImage).toHaveAttribute('src', expect.stringContaining('img1.jpg'));
  });

  test('renders faculty login button with image', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    const facultyButton = screen.getByRole('button', { name: /Faculty/i });
    expect(facultyButton).toBeInTheDocument();

    const facultyImage = screen.getByAltText('Faculty Logo');
    expect(facultyImage).toBeInTheDocument();
    expect(facultyImage).toHaveAttribute('src', expect.stringContaining('img2.jpg'));
  });

  test('navigates to student login page on student button click', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    const studentButton = screen.getByRole('button', { name: /Student/i });
    fireEvent.click(studentButton);
    expect(mockedNavigate).toHaveBeenCalledWith('/student-login');
  });

  test('navigates to faculty login page on faculty button click', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    const facultyButton = screen.getByRole('button', { name: /Faculty/i });
    fireEvent.click(facultyButton);
    expect(mockedNavigate).toHaveBeenCalledWith('/faculty-login');
  });
});
