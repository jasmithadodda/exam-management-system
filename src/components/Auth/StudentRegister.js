import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentRegister() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setMessage('All fields are required');
      return;
    }

    if (!validatePassword(password)) {
      setMessage('Password must be at least 6 characters long, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/student-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Student registered successfully!');
        setTimeout(() => navigate('/student-login'), 1000);
      } else {
        setMessage(data.error || 'Error registering student.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error registering student.');
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
    alignItems: 'center'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4a90e2',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s'
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
          <h1>Join Us and Enhance Your Learning Experience</h1>
          <p>Already have an account? <span style={linkStyle} onClick={() => navigate('/student-login')}>Sign In</span></p>
        </div>
        <div style={rightSectionStyle}>
          <h2>Register</h2>
          <form onSubmit={handleRegister} style={formStyle}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={inputStyle}
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
            <button
              type="submit"
              style={buttonStyle}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#357ABD'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4a90e2'}
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

export default StudentRegister;
