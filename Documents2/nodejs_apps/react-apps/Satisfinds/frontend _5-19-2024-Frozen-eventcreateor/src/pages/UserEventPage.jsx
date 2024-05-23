import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { fetchUserEventNameData } from '../api/eventApi';

import QRCode from '../components/QRcode';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import '../styles/UserEventPage.css';
import spinner from '../content/images/Bean Eater@1x-1.0s-200px-200px.svg';

const UserEventPage = () => {
  const { eventname } = useParams(); 
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

    

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        
        const event = await fetchUserEventNameData(eventname);

       

       
        
        setEventData(event);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        setError('Page not found');
      }
    };

    fetchAllData();
  }, [eventname]);

  const profileAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 500 },
  });

  return (
    <div className="container-2">
      <animated.div style={profileAnimation}>
        <div className="over-profile">
          {loading ? (
            <div><img src={spinner} alt="Loading..." /></div>
          ) : error ? (
            <div>{error}</div>
          ) : eventData ? (
            <div className="profile" style={{
              backgroundImage: eventData.backgroundType === 'image' ? `url(${eventData.backgroundImage})` : 'none',
              backgroundColor: eventData.backgroundType === 'color' ? eventData.backgroundColor : 'transparent',
              color: eventData.textColor,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}>
              <div className="profile-cage">
                <div className="info-div">
                  <div className="info-div-header">
                    <h3>{eventData.eventname || 'Event - Name'}</h3>
                    <p>{eventData.tagline || 'Event - Tagline'}</p>
                  </div>
                  <div>
                    <p>{eventData.cuisine || 'Event - Cuisine'}</p>
                    <p>{eventData.bio || 'Event - Bio'}</p>
                  </div>
                  <div>
                    <p>{eventData.address || 'Event - Address'}</p>
                    <p>{eventData.city}, {eventData.state} {eventData.zip}</p>
                  </div>
                  <p>{eventData.phone || 'Event - Phone'}</p>

                  <div className="link-social-icons">
                    {eventData.socialMedia?.facebook && (
                      <a href={eventData.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="link-social-icon"><FaFacebook /></a>
                    )}
                    {eventData.socialMedia?.twitter && (
                      <a href={eventData.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="link-social-icon"><FaTwitter /></a>
                    )}
                    {eventData.socialMedia?.instagram && (
                      <a href={eventData.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="link-social-icon"><FaInstagram /></a>
                    )}
                    {eventData.socialMedia?.linkedin && (
                      <a href={eventData.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="link-social-icon"><FaLinkedin /></a>
                    )}
                  </div>
                  <div>
                    <QRCode value={`https://satisfinds.com/public/${eventData.eventname}`} />
                  </div>
                  <div className="link-info-div">
                    {eventData.links && eventData.links.map((link, index) => (
                      <p key={index}><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></p>
                    ))}
                  </div>
                </div>
                <div className="column-div">
                  {eventData.image && (
                    <>
                      <div>
                        <img src={eventData.image} alt="Profile" />
                      </div>
                      <div className="images1">
                        <img src={eventData.image1} alt="Profile-1" />
                      </div>
                      <div className="images1">
                        <img src={eventData.image2} alt="Profile-2" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>User not found</div>
          )}
        </div>
      </animated.div>
    </div>
  );
};

export default UserEventPage;
