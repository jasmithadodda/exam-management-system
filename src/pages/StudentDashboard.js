import React, { useState, useEffect } from 'react';
import '../Styles/Sdashboard.css'; // Import the CSS file

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState(''); // State to manage active tab
  const [assignments, setAssignments] = useState([]); // State to store fetched assignments
  const [examSchedules, setExamSchedules] = useState([]); // State to store fetched exam schedules
  const [selectedFile, setSelectedFile] = useState(null); // State to store selected file
  const [message, setMessage] = useState(''); // State to manage response messages
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  // Fetch assignments when the component mounts or when the tab is changed
  useEffect(() => {
    if (activeTab === 'viewAssignments') {
      fetchAssignments();
    } else if (activeTab === 'viewExamSchedule') {
      fetchExamSchedules();
    }
  }, [activeTab]);

  // Function to fetch assignments from the server
  const fetchAssignments = async () => {
    try {
      const response = await fetch('http://localhost:5000/assignments');
      const data = await response.json();
      if (response.ok) {
        setAssignments(data);
      } else {
        console.error('Failed to fetch assignments:', data.error);
      }
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  // Function to fetch exam schedules from the server
  const fetchExamSchedules = async () => {
    try {
      const response = await fetch('http://localhost:5000/exam-schedules');
      const data = await response.json();
      if (response.ok) {
        setExamSchedules(data);
      } else {
        console.error('Failed to fetch exam schedules:', data.error);
      }
    } catch (error) {
      console.error('Error fetching exam schedules:', error);
    }
  };

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Update state with selected file
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/upload-assignment', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('File uploaded successfully!');
        setSelectedFile(null); // Reset file input
      } else {
        setMessage(data.error || 'Error uploading file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file. Please try again later.');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setActiveTab(''); // Reset active tab
    window.location.href = '/'; // Redirect to home page after logout
  };

  // Filter assignments based on the search term
  const filteredAssignments = assignments.filter((assignment) =>
    assignment.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              onClick={() => setActiveTab('uploadAssignment')}
            >
              Upload Assignment
            </li>
            <li
              className="sidebar-item"
              onClick={() => setActiveTab('viewExamSchedule')}
            >
             View Exam Schedule
            </li>
            <li
              className="sidebar-item" onClick={handleLogout} style={{ color: 'red' }}  // Inline style to set text color to red
            >
              Logout
            </li>
          </ul>
        </aside>
        <main className="studentdashboard-content">
          {!activeTab && <p>Welcome to Student Dashboard</p>}
          {activeTab === 'viewAssignments' && (
            <div className="assignments">
              <h2>Assignments</h2>
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
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {activeTab === 'uploadAssignment' && (
            <div className="upload-assignment">
              <h2>Upload Assignment</h2>
              <form onSubmit={handleFileUpload}>
                <input
                  type="file"
                  onChange={handleFileChange}
                />
                <button type="submit">Upload</button>
              </form>
              {message && <p>{message}</p>}
            </div>
          )}
          {activeTab === 'viewExamSchedule' && (
            <div className="exam-schedule">
              <h2>Exam Schedule</h2>
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
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;
