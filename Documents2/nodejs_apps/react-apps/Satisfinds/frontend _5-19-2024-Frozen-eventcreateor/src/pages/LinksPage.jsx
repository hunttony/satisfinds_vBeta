import React, { useState, useEffect } from 'react';
import { fetchLinksPageData } from '../api/linksApi';
import { Link } from 'react-router-dom';
import '../styles/LinksPage.css';
import VideoBkg from '../content/video/food_video.mp4';
import spinner from '../content/images/Bean Eater@1x-1.0s-200px-200px.svg';

const LinksPage = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLinksPageData(); // No need to pass userEmail
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter user data based on search term
  const filteredUserData = userData.filter(user => {
    return (
      (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.cuisine && user.cuisine.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.dish && user.dish.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  });

  return (
    <div className="pre-container">
      <video autoPlay loop muted className="video-background">
        <source src={VideoBkg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {loading ? (
        <div>
          <img src={spinner} alt="Searching Satisfinds..." />
        </div>
      ) : (
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name, cuisine, or dish"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          
          <div className="card-container">
            <div className="card-list">
              {filteredUserData.length > 0 ? (
                filteredUserData.map((user, index) => (
                  <Link to={`/public/${user.name}`} key={index} className="card">
                    <div key={index}>
                      <h2>{user.name}</h2>
                      {user.cuisine && <p>{user.cuisine}</p>}
                      {user.phone && <p>{user.phone}</p>}
                      {user.city && user.state && user.zip && (
                        <p>
                          {user.city}, {user.state} {user.zip}
                        </p>
                      )}
                    </div>
                  </Link>
                ))
              ) : (
                <p>No results found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinksPage;
