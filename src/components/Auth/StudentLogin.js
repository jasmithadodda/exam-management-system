/**
 * The `StudentLogin` function in React handles student login functionality with form inputs for email
 * and password, error message display, and navigation links.
 * @returns The `StudentLogin` component is being returned. It consists of a form for student login
 * with email and password fields, a sign-in button, and a link to sign up if the user doesn't have an
 * account. The component also includes styles for the layout and elements like the card, form, input
 * fields, buttons, and links.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';

function StudentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/student-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login successful');
        navigate('/student-dashboard');
      } else {
        setMessage(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Error logging in. Please try again later.');
    }
  };

  const goToRegister = () => {
    navigate('/student-register');
  };

  // Unified styles
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f7f8fc',
  };

  const cardStyle = {
    display: 'flex',
    flexDirection: 'row',
    width: '800px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  };

  const leftPaneStyle = {
    flex: 1,
    backgroundColor: '#1e1e2d',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
  };

  const rightPaneStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
  };

  const formStyle = {
    width: '100%',
    maxWidth: '300px',
  };

  const inputContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '10px',
    padding: '0 10px',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: 'none',
    fontSize: '14px',
  };

  const iconStyle = {
    color: 'black',
    marginRight: '10px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#6c63ff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  };

  const linkStyle = {
    color: '#6c63ff',
    textDecoration: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={leftPaneStyle}>
          <h1>Welcome to Your Academic Community</h1>
        </div>
        <div style={rightPaneStyle}>
          <div style={formStyle}>
            <h2>Sign in</h2>
            <form onSubmit={handleLogin}>
              <div style={inputContainerStyle}>
                <FaEnvelope style={iconStyle} />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
              <div style={inputContainerStyle}>
                <FaLock style={iconStyle} />
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
              >
                SIGN IN
              </button>
            </form>
            {message && <p style={{ color: 'red' }}>{message}</p>}
            <p>
              Don't have an account?{' '}
              <span onClick={goToRegister} style={linkStyle}>
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
