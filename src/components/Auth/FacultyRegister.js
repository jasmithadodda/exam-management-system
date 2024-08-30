import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FacultyRegister() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

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
    fontSize: '16px'
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
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
            <input
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
