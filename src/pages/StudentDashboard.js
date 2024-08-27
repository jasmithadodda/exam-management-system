import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Sdashboard.css';

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState(''); // State to manage active tab
  const [assignments, setAssignments] = useState([]); // State to store fetched assignments
  const [submission, setSubmission] = useState(''); // State for assignment submission
  const [message, setMessage] = useState(''); // State to manage response messages

  const navigate = useNavigate(); // Initialize navigate for redirection

  useEffect(() => {
    if (activeTab === 'viewAssignments') {
      fetchAssignments(); // Fetch assignments when "View Assignments" is active
    }
  }, [activeTab]);

  const fetchAssignments = async () => {
    try {
      const response = await fetch('http://localhost:5000/assignments');
      const data = await response.json();
      if (response.ok) {
        setAssignments(data);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/submit-assignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ submission }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Assignment submitted successfully!');
        setSubmission(''); // Clear submission form after submission
      } else {
        setMessage(data.error || 'Error submitting assignment.');
      }
    } catch (error) {
      console.error('Error submitting assignment:', error);
      setMessage('Error submitting assignment. Please try again later.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username'); // Remove username from localStorage
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="studentdashboard-container">
      <header className="header-container">
        <h1>Student Dashboard</h1>
      </header>
      <div className="studentdashboard-main-content">
        <aside className="studentdashboard-sidebar">
          <ul className="sidebar-list">
            <li 
              className="sidebar-item"
              onClick={() => setActiveTab('viewAssignments')}
            >
              View Assignments
            </li>
            <li 
              className="sidebar-item"
              onClick={() => setActiveTab('submitAssignment')}
            >
              Submit Assignment
            </li>
            <li 
              className="sidebar-item"
              onClick={handleLogout} // Logout functionality
              style={{ color: 'red', cursor: 'pointer' }} // Optional styling for logout
            >
              Logout
            </li>
          </ul>
        </aside>
        <section className="studentdashboard-content">
          {activeTab === 'viewAssignments' && (
            <div>
              <h2>View Assignments</h2>
              {assignments.length === 0 ? (
                <p>No assignments available.</p>
              ) : (
                <ul>
                  {assignments.map((assignment) => (
                    <li key={assignment._id}>
                      <p>Question: {assignment.question}</p>
                      <p>Deadline: {new Date(assignment.deadline).toLocaleDateString()}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === 'submitAssignment' && (
            <div>
              <h2>Submit Assignment</h2>
              <form onSubmit={handleAssignmentSubmit}>
                <div className="form-group">
                  <label>Submission:</label>
                  <textarea 
                    value={submission} 
                    onChange={(e) => setSubmission(e.target.value)} 
                    required 
                    className="form-input"
                  />
                </div>
                <button type="submit" className="form-button">Submit</button>
              </form>
              {message && <p>{message}</p>} {/* Display response messages */}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default StudentDashboard;
