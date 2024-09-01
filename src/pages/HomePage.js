/**
 * The `HomePage` function in JavaScript renders a homepage component for an Exam Management System
 * with buttons to navigate to student and faculty login pages.
 * @returns The `HomePage` component is being returned. It consists of a container with a background
 * image and content container. Inside the content container, there is a title "Exam Management System"
 * and two login buttons for Student and Faculty. Each button has an image logo and text. The component
 * also uses `useNavigate` from 'react-router-dom' to navigate to different routes when the buttons are
 * clicked.
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/HomePage.css';
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';

function HomePage() {
  const navigate = useNavigate();

  const goToStudentLogin = () => {
    navigate('/student-login');
  };

  const goToFacultyLogin = () => {
    navigate('/faculty-login');
  };

  return (
    <div className="homepage-container">
      <div className="background-image"></div>
      <div className="content-container">
        <h1 className="homepage-title">Exam Management System</h1>
        <div className="login-buttons-container">
          <button onClick={goToStudentLogin} className="login-button student-button">
            <img src={img1} alt="Student Logo" className="logo" />
            Student
          </button>
          <button onClick={goToFacultyLogin} className="login-button faculty-button">
            <img src={img2} alt="Faculty Logo" className="logo" />
            Faculty
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;