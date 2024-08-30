import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FacultyDashboard from './FacultyDashboard'; // Adjust according to your path

// Wrapper function to include Router
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: MemoryRouter });
};

test('shows create assignment form when "Manage Assignments" tab is clicked', () => {
  renderWithRouter(<FacultyDashboard />);
  fireEvent.click(screen.getByText(/Manage Assignments/i));
  // Assuming "Create Assignment" is a part of the form that becomes visible
  expect(screen.getByText(/Create Assignment/i)).toBeInTheDocument();
});


test('logs out and redirects to home page when "Logout" is clicked', () => {
    renderWithRouter(<FacultyDashboard />);
  
    // Ensure the sidebar is visible
    expect(screen.getByText(/Manage Assignments/i)).toBeInTheDocument();
    
    // Simulate clicking the Logout button
    fireEvent.click(screen.getByText(/Logout/i));
  
    // Verify redirection to home page or reset state
    // Assuming your home page has a specific text or component to verify
    expect(screen.getByText(/Welcome to Faculty Dashboard/i)).toBeInTheDocument();
  });

 