import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Container, Input, Button, Alert, AlertIcon } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import '../styles/Signup.css';

const SignUp = () => {
  const { signup } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(credentials);
      setError('Signup successful');
    } catch (error) {
      setError('Sign-up failed. Email already registered. Please check your credentials and try again.');
      console.error('Sign-up error:', error.message);
    }
  };

  return (
    <Container className="container">
      <div className="sign-up-container">
        <h2>Sign Up</h2>
        {error && (
          <Alert status="error" mb={16}>
            <AlertIcon  mb={16}/>
            <h2>{error}</h2>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="sign-up-form">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            mb={4}
          />          
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            mb={4}
          />

          <Button type="submit" mb={4}>
            Sign Up
          </Button>
        </form>
        {/* Use Navigate component after successful sign up */}
        {error === 'Signup successful' && <Navigate to="/Login" />}
      </div>
    </Container>
  );
};

export default SignUp;
