import React, { useState, useEffect } from 'react';
import { fetchEventPageData } from '../api/eventApi';
import { Link } from 'react-router-dom';
import '../styles/LinksPage.css';
import VideoBkg from '../content/video/food_video.mp4';
import spinner from '../content/images/Bean Eater@1x-1.0s-200px-200px.svg';

const Events = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await fetchEventPageData(); // No need to pass userEmail
        setEventData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event data:', error);
        setLoading(false);
      }
    };

    fetchEvent();
  }, []);

  // Filter user data based on search term
  const filteredEventData = eventData.filter(event => {
    return (
      (event.eventname && event.eventname.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (event.city && event.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (event.startDate && event.startDate.toLowerCase().includes(searchTerm.toLowerCase()))
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
            placeholder="Search by event name, date, or location"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          
          <div className="card-container">
            <div className="card-list">
              {filteredEventData.length > 0 ? (
                filteredEventData.map((event, index) => (
                  <Link to={`/events/${event.eventname}`} key={index} className="card">
                    <div key={index}>
                      <h2>{event.name}</h2>
                      {event.cuisine && <p>{event.cuisine}</p>}
                      {event.phone && <p>{event.phone}</p>}
                      {event.city && event.state && event.zip && (
                        <p>
                          {event.city}, {event.state} {event.zip}
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

export default Events;
