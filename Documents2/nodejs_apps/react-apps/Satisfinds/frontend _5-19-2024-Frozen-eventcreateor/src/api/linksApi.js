// linkApi.js

// Function to fetch link data from the server
export const fetchLinkData = async (userEmail) => {
  try {
    // Make an API request to fetch link data
    const response = await fetch(`http://localhost:3001/links/${userEmail}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch link data');
    }
    const linkData = await response.json();    
    return linkData;
  } catch (error) {
    console.error('Error fetching link data:', error.message);
    throw error;
  }
};

// Function to update link data on the server
export const updateLinkData = async (userEmail, linkData) => {
  try {
    // Make an API request to update link data
    const response = await fetch(`http://localhost:3001/links/${userEmail}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(linkData),
    });

    if (!response.ok) {
      throw new Error('Failed to update link data');
    }
    const updatedLinkData = await response.json();

    return updatedLinkData;
  } catch (error) {
    console.error('Error updating link data:', error.message);
    throw error;
  }
};

export const fetchLinksPageData = async () => {
  try {
    // Make an API request to fetch link data
    const response = await fetch(`http://localhost:3001/links`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    
    console.log(response);

    if (!response.ok) {
      throw new Error('Failed to fetch link data');
    }
    const linkData = await response.json();
    
    return linkData;
  } catch (error) {
    console.error('Error fetching link data:', error.message);
    throw error;
  }
};
