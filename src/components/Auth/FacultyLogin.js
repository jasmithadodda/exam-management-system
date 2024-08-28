import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FacultyLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // State to manage response messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/faculty-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Faculty Logged In:', { email, password });
        navigate('/faculty-dashboard');
      } else {
        setMessage(data.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Error logging in. Please try again later.');
    }
  };

  const goToRegister = () => {
    navigate('/faculty-register');
  };

  // Styling
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#A8CAD6'
  };

  const formStyle = {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
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
    backgroundColor: '#007bff', // Primary button color
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3' // Darker button color on hover
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2>Faculty Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <br />
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
          >
            Login
          </button>
        </form>
        {message && <p style={{ color: 'red' }}>{message}</p>} {/* Display error message */}
        <p>
          Not registered yet?{' '}
          <span onClick={goToRegister} style={{ color: 'blue', cursor: 'pointer' }}>
            Click here to register.
          </span>
        </p>
      </div>
    </div>
  );
}

export default FacultyLogin;
