import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { fetchLinkData } from '../api/linksApi';
import QRCode from '../components/QRcode'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import '../styles/UserLinkPage.css';
import spinner from '../content/images/Bean Eater@1x-1.0s-200px-200px.svg';

const UserLinkPage = () => {
  const { userName } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await fetchLinkData(userName);
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
        setError('Page not found');
      }
    };

    fetchUserData();
  }, [userName]);

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
          ) : userData ? (
            <div className="profile" style={{
              backgroundImage: userData.backgroundType === 'image' ? `url(${userData.backgroundImage})` : 'none',
              backgroundColor: userData.backgroundType === 'color' ? userData.backgroundColor : 'transparent',
              color: userData.textColor,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}>
              <div className="profile-cage">
                <div className="info-div">
                  <div className="info-div-header">
                    <h3>{userData?.name || 'User - Name'}</h3>
                    <p>{userData?.tagline || 'User - Tagline'}</p>
                  </div>
                  <div className="">
                    <p>{userData?.cuisine || 'User - Cuisine'}</p>
                    <p>{userData?.bio || 'User - Bio'}</p>
                  </div>
                  <div>
                    <p>{userData?.address || 'User - Address'}</p>
                    <p>{userData?.city}, {userData?.state} {userData?.zip}</p>
                  </div>
                  <p>{userData?.phone || 'User - Phone'}</p>

                  <div className="link-social-icons">
                      {userData?.socialMedia?.facebook && (
                        <a href={userData.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="link-social-icon"><FaFacebook /></a>
                      )}
                      {userData?.socialMedia?.twitter && (
                        <a href={userData.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="link-social-icon"><FaTwitter /></a>
                      )}
                      {userData?.socialMedia?.instagram && (
                        <a href={userData?.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="link-social-icon"><FaInstagram /></a>
                      )}
                      {userData?.socialMedia?.linkedin && (
                        <a href={userData.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="link-social-icon"><FaLinkedin /></a>
                      )}
                      {/* Add more social media icons as needed */}
                    </div>
                    <div><QRCode value={`https://satisfinds.com/public/${userData.name}`} /></div>
                  <Link className="link-info-div">
                    {userData?.links && userData?.links.map((link, index) => (
                      <p key={index}>{link}</p>
                    ))}
                  </Link>

                  
                </div>
                <div className="column-div">
                  {userData.image && (
                    <div>
                      <img src={userData.image} alt="Profile" />
                    </div>
                  )}
                  {userData.image && (
                    <div className="images1">
                      <img src={userData.image1} alt="Profile-1" />
                    </div>
                  )}
                  <div className="images1">
                    {userData.image && (
                      <div className="images1">
                        <img src={userData.image2} alt="Profile-2" />
                      </div>
                    )}
                  </div>
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

export default UserLinkPage;
