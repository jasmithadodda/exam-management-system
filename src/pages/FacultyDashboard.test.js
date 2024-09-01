/**
 * The above code contains two test cases using Jest and React Testing Library to check functionality
 * in a Faculty Dashboard component, including showing a form on clicking "Manage Assignments" and
 * logging out to redirect to the home page.
 * @param ui - The `ui` parameter in the `renderWithRouter` function is the component that you want to
 * render within the `MemoryRouter` context. In this case, it is the `<FacultyDashboard />` component
 * that you are testing.
 * @param [] - The code you provided is a test suite for a React component called `FacultyDashboard`.
 * It includes two test cases using the `@testing-library/react` library for testing React components.
 * @returns The code snippet provided contains two test cases for a React component called
 * `FacultyDashboard`. The first test case checks if the "Create Assignment" form is displayed when the
 * "Manage Assignments" tab is clicked. The second test case verifies that clicking the "Logout" button
 * redirects the user to the home page.
 */
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

 