// src/api/userApi.js

// Function to fetch user data from the server
export const fetchUserData = async (userEmail) => {
  try {
    // Make an API request to fetch user data
    const response = await fetch(`http://localhost:3001/profile/${userEmail}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData = await response.json();
    
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    throw error;
  }
};

// Function to update user data on the server
export const updateUser = async (userEmail, userData) => {
  try {
    // Make an API request to update user data
    const response = await fetch(`http://localhost:3001/profile/${userEmail}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    
    if (!response.ok) {
      throw new Error('Failed to update user data');
    }
    const updatedUserData = await response.json();
    
    return updatedUserData;   

  } catch (error) {
    console.error('Error updating user data:', error.message);
    throw error;
  }
};
