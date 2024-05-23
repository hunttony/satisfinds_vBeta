import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    try {
      // Make API request to authenticate user
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),              
      });
     
  
      if (!response.ok) {
        
        throw new Error('Login failed');
      }
  
      // If login is successful, extract user data from response
      const { token, user } = await response.json();
  
      // Set authentication token and user data in state or local storage upon successful login
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error) {
      console.error('Login error:', error.message);
      // Handle login error (e.g., display error message to user)
    }
  };

  const signup = async (userData) => {
    try {
      // Make API request to sign up user
      const response = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Sign-up failed');
      }

      // If sign-up is successful, extract user data from response and set it in state or local storage
      const data = await response.json();
      
      console.log('Sign-up successful:', data);

      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

    } catch (error) {
      console.error('Sign-up error:', error.message);
      throw error; // Rethrow error to handle in calling code
    }
  };

  const logout = () => {
    // Clear user data from state or local storage
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
