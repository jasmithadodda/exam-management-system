/* This JavaScript code snippet is a test suite for a React component called `StudentDashboard`. Here's
a breakdown of what the code is doing: */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StudentDashboard from './StudentDashboard'; // Adjust the path as necessary

// Mocking fetch API to prevent actual network calls
global.fetch = jest.fn();

describe('StudentDashboard', () => {
  beforeEach(() => {
    // Clear all instances and calls to fetch
    fetch.mockClear();
  });

  test('renders Student Dashboard header', () => {
    render(<StudentDashboard />);
    expect(screen.getByText('Student Dashboard')).toBeInTheDocument();
  });

  test('renders default welcome message', () => {
    render(<StudentDashboard />);
    expect(screen.getByText('Welcome to Student Dashboard')).toBeInTheDocument();
  });

  test('renders assignments tab content when "View Assignments" is clicked', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { _id: '1', question: 'What is React?', deadline: '2024-09-01T00:00:00Z' },
      ],
    });

    render(<StudentDashboard />);
    
    fireEvent.click(screen.getByText('View Assignments'));
    
    await waitFor(() => {
      expect(screen.getByText('Assignments')).toBeInTheDocument();
      expect(screen.getByText('Question: What is React?')).toBeInTheDocument();
    });
  });

  test('renders exam schedule tab content when "View Exam Schedule" is clicked', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { _id: '1', courseName: 'Mathematics', examDate: '2024-10-01T00:00:00Z', examTime: '10:00 AM' },
      ],
    });

    render(<StudentDashboard />);
    
    fireEvent.click(screen.getByText('View Exam Schedule'));
    
    await waitFor(() => {
      expect(screen.getByText('Exam Schedule')).toBeInTheDocument();
      expect(screen.getByText('Course: Mathematics')).toBeInTheDocument();
    });
  });

});
