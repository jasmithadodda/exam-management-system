/**
 * The FacultyRegister function in React handles the registration of faculty members with form input
 * validation and error handling.
 * @returns The FacultyRegister component is being returned. It contains a form for faculty
 * registration with input fields for username, email, and password. The form includes validation for
 * the password format and a submit button to register the faculty member. The component also includes
 * styling for the layout and elements within the form. Additionally, there is a message displayed
 * below the form to show success or error messages after registration attempts.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

function FacultyRegister() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Password validation function
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setMessage('Password must be at least 6 characters long, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/faculty-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Faculty registered successfully!');
        setTimeout(() => {
          navigate('/faculty-login');
        }, 1000);
      } else {
        setMessage(data.error || 'Error registering faculty.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error registering faculty.');
    }
  };

  // Styling
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f7f9fc'
  };

  const cardStyle = {
    display: 'flex',
    maxWidth: '900px',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  };

  const leftSectionStyle = {
    flex: '1',
    backgroundColor: '#1a202c',
    color: '#ffffff',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  };

  const rightSectionStyle = {
    flex: '1',
    padding: '40px',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px' // Ensure form fields and button have consistent width
  };

  const inputWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '5px',
    boxSizing: 'border-box',
    width: '100%' // Full width for uniform input sizes
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: 'none',
    boxSizing: 'border-box',
    fontSize: '16px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4a90e2',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  };

  const buttonHoverStyle = {
    backgroundColor: '#357ABD'
  };

  const linkStyle = {
    color: '#4a90e2',
    cursor: 'pointer',
    textDecoration: 'underline'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={leftSectionStyle}>
          <h1>Empower Your Teaching Journey</h1>
          <p>Already have an account? <span style={linkStyle} onClick={() => navigate('/faculty-login')}>Sign In</span></p>
        </div>
        <div style={rightSectionStyle}>
          <h2>Register</h2>
          <form onSubmit={handleRegister} style={formStyle}>
            <div style={inputWrapperStyle}>
              <FaUser style={{ marginRight: '10px', fontSize: '20px' }} />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <div style={inputWrapperStyle}>
              <FaEnvelope style={{ marginRight: '10px', fontSize: '20px' }} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <div style={inputWrapperStyle}>
              <FaLock style={{ marginRight: '10px', fontSize: '20px' }} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <button
              type="submit"
              style={buttonStyle}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
            >
              Register
            </button>
          </form>
          {message && <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default FacultyRegister;
