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
      <h1 className="homepage-title"> Exam Management System</h1>

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
  );
}

export default HomePage;