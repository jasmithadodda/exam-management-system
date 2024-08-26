// src/components/Auth/FacultyLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FacultyLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Faculty Logged In:', { email, password });
    navigate('/faculty-dashboard');
  };

  const goToRegister = () => {
    navigate('/faculty-register');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Faculty Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <button type="submit" style={{ padding: '10px 20px', margin: '10px' }}>Login</button>
      </form>
      <p>
        Not registered yet?{' '}
        <span onClick={goToRegister} style={{ color: 'blue', cursor: 'pointer' }}>
          Click here to register.
        </span>
      </p>
    </div>
  );
}

export default FacultyLogin;
