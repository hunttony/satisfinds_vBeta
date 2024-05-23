import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Alert, AlertIcon } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom'; // Import Navigate
import '../styles/Login.css';

const Login = () => {
  const { login } = useAuth(); // Assuming you have isLoggedIn state in your AuthContext
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call login function from AuthContext with credentials
      await login(credentials);
      setError('Login successful');
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
      console.error('Login error:', error.message);
      // Handle login error (e.g., display error message to user)
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <h2>Login</h2>
        {error && (
          <Alert status="error" mb={16}>
            <AlertIcon mb={16} />
            <h2>{error}</h2>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
        {/* Use Navigate component after successful login */}
        {error === 'Login successful' && <Navigate to="/Dashboard" />}
      </div>
    </div>
  );
};

export default Login;
