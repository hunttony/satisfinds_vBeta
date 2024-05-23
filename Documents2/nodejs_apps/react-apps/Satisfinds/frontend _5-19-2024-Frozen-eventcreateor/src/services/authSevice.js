// authService.js

// Function to authenticate user credentials
export const authenticateUser = async (credentials) => {
  try {
    // Make API request to authenticate user
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    // If login is successful, extract user data from response
    const { token, user } = await response.json();

    // Return authentication token and user data
    return { token, user };
  } catch (error) {
    console.error('Login error:', error.message);
    throw error; // Rethrow error to handle in calling code
  }
};

// Function to log out user
export const logoutUser = async () => {
  try {
    // Make API request to log out user (if required)
    // For example, invalidate session or token on the server
    // Optionally, clear local storage or cookies on the client side
  } catch (error) {
    console.error('Logout error:', error.message);
    throw error; // Rethrow error to handle in calling code
  }
};
