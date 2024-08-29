import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Fdashboard.css';

function FacultyDashboard() {
  const [activeTab, setActiveTab] = useState(''); // State to manage active tab
  const [showCreateForm, setShowCreateForm] = useState(false); // State to control form visibility
  const [assignments, setAssignments] = useState([]); // State to store fetched assignments
  const [editingAssignment, setEditingAssignment] = useState(null); // State to manage editing assignment
  const [submissions, setSubmissions] = useState([]); // State to store submissions
  const [question, setQuestion] = useState('');
  const [deadline, setDeadline] = useState('');
  const [message, setMessage] = useState(''); // State to manage response messages
  const [examSchedules, setExamSchedules] = useState([]); // State to store exam schedules
  const [courseName, setCourseName] = useState(''); // State for course name input
  const [examDate, setExamDate] = useState(''); // State for exam date input
  const [examTime, setExamTime] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  const navigate = useNavigate(); // Initialize navigate for redirection

  useEffect(() => {
    if (activeTab === 'viewAssignments') {
      fetchAssignments(); // Fetch assignments when "View Assignments" is active
    } else if (activeTab === 'submissions') {
      fetchSubmissions(); // Fetch submissions when "Submissions" tab is active
    } else if (activeTab === 'examSchedule') {
      fetchExamSchedules(); // Fetch exam schedules when "Exam Schedule" tab is active
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

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('http://localhost:5000/submissions');
      const data = await response.json();
      if (response.ok) {
        setSubmissions(data);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const fetchExamSchedules = async () => {
    try {
      const response = await fetch('http://localhost:5000/exam-schedules');
      const data = await response.json();
      if (response.ok) {
        setExamSchedules(data);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error fetching exam schedules:', error);
    }
  };

  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/create-assignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, deadline }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Assignment created successfully!');
        // Clear form after submission
        setQuestion('');
        setDeadline('');
        setShowCreateForm(false); // Hide form after submission
        fetchAssignments(); // Refresh assignments list
      } else {
        setMessage(data.error || 'Error creating assignment.');
      }
    } catch (error) {
      console.error('Error creating assignment:', error);
      setMessage('Error creating assignment. Please try again later.');
    }
  };

  const handleEditAssignment = (assignment) => {
    setEditingAssignment(assignment);
    setQuestion(assignment.question);
    setDeadline(assignment.deadline.split('T')[0]); // Format date for input
  };

  const handleUpdateAssignment = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/assignments/${editingAssignment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, deadline }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Assignment updated successfully!');
        setEditingAssignment(null);
        setQuestion('');
        setDeadline('');
        fetchAssignments(); // Refresh assignments list
      } else {
        setMessage(data.error || 'Error updating assignment.');
      }
    } catch (error) {
      console.error('Error updating assignment:', error);
      setMessage('Error updating assignment. Please try again later.');
    }
  };

  const handleDeleteAssignment = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/assignments/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Assignment deleted successfully!');
        fetchAssignments(); // Refresh assignments list
      } else {
        setMessage(data.error || 'Error deleting assignment.');
      }
    } catch (error) {
      console.error('Error deleting assignment:', error);
      setMessage('Error deleting assignment. Please try again later.');
    }
  };

  const handleDownloadFile = async (filename) => {
    try {
      const response = await fetch(`http://localhost:5000/download/${filename}`);
      if (response.ok) {
        // Create a link element to trigger the file download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        console.error('Error downloading file.');
        setMessage('Error downloading file.');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      setMessage('Error downloading file. Please try again later.');
    }
  };

  const handleExamScheduleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/create-exam-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseName, examDate, examTime }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Exam schedule created successfully!');
        // Clear form after submission
        setCourseName('');
        setExamDate('');
        setExamTime('');
        fetchExamSchedules(); // Refresh exam schedules list
      } else {
        setMessage(data.error || 'Error creating exam schedule.');
      }
    } catch (error) {
      console.error('Error creating exam schedule:', error);
      setMessage('Error creating exam schedule. Please try again later.');
    }
  };

  const handleLogout = () => {
    // Clear session storage or any user-related data here
    // localStorage.removeItem('token'); // Example if using tokens
    setActiveTab(''); // Reset active tab
    navigate('/'); // Redirect to home page
  };

  // Filter assignments based on the search term
  const filteredAssignments = assignments.filter((assignment) =>
    assignment.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Faculty Dashboard</h1>
      </header>
      <div className="dashboard-main-content">
        <aside className="dashboard-sidebar">
          <ul className="sidebar-list">
            <li
              className="sidebar-item"
              onClick={() => setActiveTab('manageAssignments')}
            >
              Manage Assignments
            </li>
            <li
              className="sidebar-item"
              onClick={() => setActiveTab('viewAssignments')}
            >
              View Assignments
            </li>
            <li
              className="sidebar-item"
              onClick={() => setActiveTab('submissions')} // Added onClick to set active tab
            >
              Submissions
            </li>
            <li
              className="sidebar-item"
              onClick={() => setActiveTab('examSchedule')} // Added onClick to set active tab
            >
              Exam Schedule
            </li>
            {/* Logout Option */}
            <li
              className="sidebar-item"
              onClick={handleLogout} // Logout handler
              style={{ color: 'red', cursor: 'pointer' }} // Optional styling for logout
            >
              Logout
            </li>
          </ul>
        </aside>
        <section className="dashboard-content">
          {!activeTab && <p>Welcome to Faculty Dashboard</p>}
          {activeTab === 'manageAssignments' && (
            <div>
              <button
                className="form-button"
                onClick={() => setShowCreateForm(true)}
              >
                Create Assignment
              </button>
              {showCreateForm && (
                <div className="create-assignment-form">
                  <h2>Create Assignment</h2>
                  <form onSubmit={handleAssignmentSubmit}>
                    <div className="form-group">
                      <label>Question:</label>
                      <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Deadline:</label>
                      <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                        className="form-input"
                      />
                    </div>
                    <button type="submit" className="form-button">Submit</button>
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="form-button"
                    >
                      Cancel
                    </button>
                  </form>
                  {message && <p>{message}</p>}
                </div>
              )}
            </div>
          )}
          {activeTab === 'viewAssignments' && (
            <div className="assignments">
              <h2>View Assignments</h2>
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search assignments by question"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              {filteredAssignments.length === 0 ? (
                <p>No assignments available.</p>
              ) : (
                <ul>
                  {filteredAssignments.map((assignment) => (
                    <li key={assignment._id}>
                      <p>Question: {assignment.question}</p>
                      <p>Deadline: {new Date(assignment.deadline).toLocaleDateString()}</p>
                      <div className="form-button-group">
                        <button onClick={() => handleEditAssignment(assignment)}>Edit</button>
                        <button onClick={() => handleDeleteAssignment(assignment._id)}>Delete</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {editingAssignment && (
                <div className="edit-assignment-form">
                  <h2>Edit Assignment</h2>
                  <form onSubmit={handleUpdateAssignment}>
                    <div className="form-group">
                      <label>Question:</label>
                      <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Deadline:</label>
                      <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                        className="form-input"
                      />
                    </div>
                    <div className="form-button-group">
                      <button type="submit" className="form-button">Update</button>
                      <button onClick={() => setEditingAssignment(null)} className="form-button">Cancel</button>
                    </div>
                  </form>
                  {message && <p>{message}</p>}
                </div>
              )}
            </div>
          )}
          {activeTab === 'submissions' && (
            <div className="submissions">
              <h2>Submissions</h2>
              {submissions.length === 0 ? (
                <p>No submissions available.</p>
              ) : (
                <ul>
                  {submissions.map((filename, index) => (
                    <li key={index}>
                      <p>{filename}</p>
                      <div className="form-button-group">
                        <button onClick={() => handleDownloadFile(filename)}>Download</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {activeTab === 'examSchedule' && (
            <div className="exam-schedule">
              <h2>Create Exam Schedule</h2>
              <form onSubmit={handleExamScheduleSubmit}>
                <div className="form-group">
                  <label>Course Name:</label>
                  <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Exam Date:</label>
                  <input
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Exam Time:</label>
                  <input
                    type="time"
                    value={examTime}
                    onChange={(e) => setExamTime(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
                <button type="submit" className="form-button">Create</button>
              </form>
              {message && <p>{message}</p>}
              <h2>Exam Schedules</h2>
              {examSchedules.length === 0 ? (
                <p>No exam schedules available.</p>
              ) : (
                <ul>
                  {examSchedules.map((schedule) => (
                    <li key={schedule._id}>
                      <p>Course: {schedule.courseName}</p>
                      <p>Date: {new Date(schedule.examDate).toLocaleDateString()}</p>
                      <p>Time: {schedule.examTime}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default FacultyDashboard;
