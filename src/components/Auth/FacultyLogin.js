import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FacultyLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
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

  // Styles
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

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
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
          <h1>Empower Your Teaching Journey</h1>
        </div>
        <div style={rightPaneStyle}>
          <div style={formStyle}>
            <h2>Sign in</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email address"
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

export default FacultyLogin;
