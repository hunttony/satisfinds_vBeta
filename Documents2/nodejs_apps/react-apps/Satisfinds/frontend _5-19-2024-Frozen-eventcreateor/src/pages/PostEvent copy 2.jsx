import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { fetchUserEventData, updateUserEvent, createUserEvent } from '../api/eventApi';
import { fetchUserData } from '../api/userApi'; //  Import API functions for fetching and updating user data
import { Link, Navigate } from 'react-router-dom';
import QRCode from '../components/QRcode';
import '../styles/PostEvent.css';
import spinner from '../content/images/Bean Eater@1x-1.0s-200px-200px.svg';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const PostEvent = () => {
  // Use auth hook to access user information
  const { user } = useAuth();

  // State variables to store user data, form inputs, and uploaded images
  const [userData, setUserData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    eventname: '',
    address: '',
    phone: '',
    city: '',
    state: '',
    zip: '',
    tagline: '',
    tags: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    price: '',
    specialGuests: [],
    details: '',
    required: '',
    image: '',
    image1: '',
    textColor: '',
    backgroundColor: '',
    backgroundImage: '',
    backgroundType: 'image',
    links: [],
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
    },
  });

  const [loading, setLoading] = useState(true); // Loading indicator state
  const [uploading, setUploading] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false); // State to handle redirection to login page

  // Fetch user data when component mounts
  useEffect(() => {
    if (!user) {
      // If user is not logged in, redirect to login page
      setRedirectToLogin(true);
      return;
    }

    const fetchData = async () => {

      const initialUserProfileData = {
        username: '',
        email: '',
        // Other fields in the user profile...
      };
      try {
        const userData = await fetchUserData(user.email);
        
    
        if (!userData) {
          // Handle the case where userData is null
          console.error('User data is null');
          // Create user profile if it doesn't exist
          await createUserEvent(user.email, initialUserProfileData);
          setUserData(initialUserProfileData); // Assuming initialUserProfileData is the default data for a new user
        }
    
        if (!eventData) {
          // Handle the case where eventData is null
          
          // Create event data if it doesn't exist
          const eventData = {
            eventname: 'New Event',
            address: '',
            phone: '',
            city: '',
            state: '',
            zip: '',
            tagline: 'Exciting New Event',
            tags: '',
            startDate: '', // Add default start date if needed
            endDate: '', // Add default end date if needed
            startTime: '', // Add default start time if needed
            endTime: '', // Add default end time if needed
            price: 'Free', // Default price
            specialGuests: [],
            details: 'Details about the event',
            required: 'No special requirements',
            image: '', // URL of default image if needed
            image1: '', // URL of default additional image if needed
            textColor: '#000000', // Default text color
            backgroundColor: '#ffffff', // Default background color
            backgroundImage: '', // URL of default background image if needed
            backgroundType: 'image', // Default background type
            links: [], // Array of default links if needed
            socialMedia: {
              facebook: '', // Default Facebook link
              twitter: '', // Default Twitter link
              instagram: '', // Default Instagram link
              linkedin: '', // Default LinkedIn link
            },
          };
           // You can initialize eventData as needed for a new event
          await updateUserEvent(user.email, eventData);

          
        }
        
        if (!userData || !eventData) {
          // Handle the case where either userData or eventData is null
          console.error('User data or event data is null');
          setUserData(null);
          setEventData(null);
          return;
        }
    
        setUserData(userData);
        setEventData(eventData);
        setFormValues({
          username: userData.username || '',
          email: userData.email || '',
          eventname: eventData.eventname || '',
          address: eventData.address || '',
          phone: eventData.phone || '',
          city: eventData.city || '',
          state: eventData.state || '',
          zip: eventData.zip || '',
          tagline: eventData.tagline || '',
          tags: eventData.tags || '',
          startDate: eventData.startDate || '',
          endDate: eventData.endDate || '',
          startTime: eventData.startTime || '',
          endTime: eventData.endTime || '',
          price: eventData.price || '',
          specialGuests: eventData.specialGuests || [],
          details: eventData.details || '',
          required: eventData.required || '',
          image: eventData.image || '',
          image1: eventData.image1 || '',
          textColor: eventData?.textColorEvent || '',
          backgroundColor: eventData.backgroundColor || '',
          backgroundImage: eventData.backgroundImage || '',
          backgroundType: eventData.backgroundType || 'image',
          links: eventData.links || [],
          socialMedia: {
            facebook: eventData.socialMedia?.facebook || '',
            twitter: eventData.socialMedia?.twitter || '',
            instagram: eventData.socialMedia?.instagram || '',
            linkedin: eventData.socialMedia?.linkedin || '',
          },
        });
    
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error (e.g., display error message)
        setLoading(false); // Set loading to false on error
      }
    };
    
    fetchData();
    
  }, [user]);

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      await updateUserEvent(user.email, formValues);
      // Optionally, update local state or show a success message
    } catch (error) {
      console.error('Error updating user profile:', error);
      // Handle error (e.g., display error message)
    } finally {
      setUploading(false); // Set uploading state to false when upload completes or fails
    }
  };

  // Event handler for form input changes
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  // Event handler for uploading images
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    const reader = new FileReader();

    // Read the file as a data URL
    reader.readAsDataURL(file);

    // When the file reading is complete
    reader.onload = () => {
      // Update the form values with the data URL of the uploaded image
      setFormValues({ ...formValues, [e.target.name]: reader.result });
    };
  };

  const resetBackground = () => {
    setFormValues({
      ...formValues,
      backgroundImage: '', // Reset background image
      backgroundColor: '', // Reset background color
    });
  };

  const toggleBackgroundType = () => {
    const newType = formValues.backgroundType === 'image' ? 'color' : 'image';
    setFormValues({ ...formValues, backgroundType: newType });
  };

  // Event handler for changing links
  const handleLinkChange = (e, index) => {
    const newLinks = [...formValues.links];
    newLinks[index] = e.target.value;
    setFormValues({ ...formValues, links: newLinks });
  };

  // Event handler for adding new link
  const addLink = () => {
    setFormValues({ ...formValues, links: [...formValues.links, ''] });
  };

  const removeLink = (index) => {
    const newLinks = [...formValues.links];
    newLinks.splice(index, 1);
    setFormValues({ ...formValues, links: newLinks });
  };
  

  const isValidHexColor = (value) => {
    // Regular expression to match hexadecimal color code
    const hexColorRegex = /^#([0-9a-fA-F]{3}){1,2}$/;
    return hexColorRegex.test(value);
  };
  
  // Usage:
  if (isValidHexColor(formValues.textColorEvent)) {
    // Value is a valid hexadecimal color code
    // Set the value in the component
    <input type="text" name="textColor" value={formValues.textColorEvent} onChange={handleChange} />;
  } else {
    // Value is not a valid hexadecimal color code
    // Handle the error or provide a default value
    <input type="text" name="textColor" value="#000000" onChange={handleChange} />;
  }

  if (redirectToLogin) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  return (
    <div className="container-2">
      <div className="dashboard">
        {loading ? (
          // Render loading indicator while data is being fetched
          <div><img src={spinner} alt="Searching Your Satisfind Event(s)..." /></div>
        ) : (
          <>
          {userData && eventData && (
            <div className="top-links">
              <Link to={`/public/${formValues.eventname}`}>View Event</Link>
            </div>
              )}

            {userData && eventData && (
              <h1>{`${userData.name || 'User - Name'}'s Event`}</h1>
            )}

            <div className="profile" style={{
              backgroundImage: formValues.backgroundType === 'image' ? `url(${formValues.backgroundImage})` : 'none',
              backgroundColor: formValues.backgroundType === 'color' ? formValues.backgroundColor : 'transparent',
              color: formValues.textColorEvent,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}>

              <div className="profile-cage">

                <div className="info-div">
                  <div className="info-div-header">

                    <div className="qrcode"><QRCode value={`https://satisfinds.com/public/${userData.name}`} level="H" size={400} /></div>

                    <div className="event-info-div-title">

                      <h3>{`${eventData.eventname || 'User - Name'}`}</h3>
                      <p>{`${eventData.tagline || 'User - Tagline'}`}</p>
                    </div>
                  </div>

                  <div className="times">
                    <p>{`${eventData.startDate || 'Event - startDate'}`}</p>
                    <p>{`${eventData.endDate || 'Event - endDate'}`}</p>
                    <p>{`${eventData.startTime || 'Event - startTime'}`}</p>
                    <p>{`${eventData.endTime || 'Event - endTime'}`}</p>

                  </div>

                  <p>{`${eventData.price || 'Event - Price'}`}</p>

                  <div>
                    <p>{`${eventData.address || 'User - Address'}`}</p>
                    <p>{`${eventData.city || 'User - City'}`}, {`${eventData.state || 'User - State'}`} {`${eventData.zip || 'User - Zip'}`}</p>
                    <p>{`${eventData.phone || 'User - Phone'}`}</p>
                  </div>


                  <p>{`${eventData.specialGuests || 'Event - Special Guests'}`}</p>
                  <p>{`${eventData.details || 'Event - Details'}`}</p>
                  <p>{`${eventData.required || 'Event - Required'}`}</p>

                  <div>

                    {eventData.links && eventData.links.map((link, index) => (
                      <p key={index}>{link}</p>

                    ))}

                  </div>
                  {eventData.socialMedia?.facebook && (
                  <div className="dash-social-icons">
                    {eventData.socialMedia.facebook && (
                      <a href={eventData.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="dash-social-icon"><FaFacebook /></a>
                    )}
                    {eventData.socialMedia.twitter && (
                      <a href={eventData.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="dash-social-icon"><FaTwitter /></a>
                    )}
                    {eventData.socialMedia.instagram && (
                      <a href={eventData.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="dash-social-icon"><FaInstagram /></a>
                    )}
                    {eventData.socialMedia.linkedin && (
                      <a href={eventData.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="dash-social-icon"><FaLinkedin /></a>
                    )}
                    {/* Add more social media icons as needed */}
                  </div>
                )}
                </div>

                <div className="column-div">
                  {formValues.image && (
                    <div>
                      <img src={formValues.image} alt="Profile" />
                      <p>main image</p>
                    </div>
                  )}

                  {formValues.image && (
                    <div className="images1">
                      <img src={formValues.image2} alt="Profile" />
                      <p>image 2</p>
                    </div>
                  )}

                  <div className="other-images">
                    {formValues.image && (
                      <div className="images1">
                        <img src={formValues.image1} alt="Profile" />
                        <p>image 3</p>
                      </div>
                    )}


                  </div>
                </div>
              </div>

            </div>

            {userData && eventData && (
              <div className="over-form">
                <h2>Post or Modify your event(s) needed:</h2>
                <form onSubmit={handleSubmit}>



                <div className="form-area">

                <div className="background-block">
                  <label>
                    Background Color:
                    <input type="color" name="backgroundColor" value={formValues.backgroundColor} onChange={handleChange} />
                  </label>
                  <label>
                    Text Color:
                    <input
                      type="color"
                      name="textColor-event"
                      value={isValidHexColor(formValues.textColorEvent) ? formValues.textColorEvent : ''}
                      onChange={handleChange}
                    />
                  </label>
                  {/* Background Type Toggle Button */}
                  <button className="toggle" type="button" onClick={toggleBackgroundType}>
                    {formValues.backgroundType === 'image' ? 'Choose Color Background' : 'Choose Image Background'}
                  </button>
                  
                  {/* Background Reset Button */}
                  <button className="toggle" type="button" onClick={resetBackground}>
                    Reset Background
                  </button>
                </div>

                    <div>
                      <label>
                        Profile Image:
                        <input type="file" name="image" accept="image/*" onChange={handleImageUpload} />
                      </label>
                      <label>
                        Background Image:
                        <input type="file" name="backgroundImage" accept="image/*" onChange={handleImageUpload} />
                      </label>
                      <label>
                        Additional Image 1:
                        <input type="file" name="image1" accept="image/*" onChange={handleImageUpload} />
                      </label>
                      <label>
                        Additional Image 2:
                        <input type="file" name="image2" accept="image/*" onChange={handleImageUpload} />
                      </label>
                    </div>

                    {formValues.links.map((link, index) => (
                      <div key={index}>
                        <label>
                          Link {index + 1}:
                          <input type="text" value={link} onChange={(e) => handleLinkChange(e, index)} /><button type="button" onClick={() => removeLink(index)}>Remove</button>
                        </label>
                      </div>
                    ))}
                    <button type="button" onClick={addLink}>Add Link</button>

                    </div>
                  <div className="form2">
                    <div className="form2-local">
                      <label>
                        Username:
                        <input readOnly type="text" name="username" value={userData.username} onChange={handleChange} />
                      </label>
                      <label>
                        Email:
                        <input readOnly type="email" name="email" value={userData.email} onChange={handleChange} />
                      </label>
                      <label>
                        Event Name:
                        <input type="text" name="eventname" value={formValues.eventname} onChange={handleChange} />
                      </label>
                      <label>
                        Address:
                        <input type="text" name="address" value={formValues.address} onChange={handleChange} />
                      </label>
                      <label>
                        City:
                        <input type="text" name="city" value={formValues.city} onChange={handleChange} />
                      </label>
                      <label>
                        State:
                        <input type="text" name="state" value={formValues.state} onChange={handleChange} />
                      </label>
                      <label>
                        Zip:
                        <input type="text" name="zip" value={formValues.zip} onChange={handleChange} />
                      </label>


                      {formValues && (<div className="form2-social">
                        <label>
                          Facebook:
                          <input type="text" name="facebook" value={formValues.socialMedia.facebook} onChange={handleChange} />
                        </label>
                        <label>
                          Twitter:
                          <input type="text" name="twitter" value={formValues.socialMedia.twitter} onChange={handleChange} />
                        </label>
                        <label>
                          Instagram:
                          <input type="text" name="instagram" value={formValues.socialMedia.instagram} onChange={handleChange} />
                        </label>
                        <label>
                          LinkedIn:
                          <input type="text" name="linkedin" value={formValues.socialMedia.linkedin} onChange={handleChange} />
                        </label>
                      </div>
                      )}
                    </div>



                    <div className="form2-tag">
                    <label>
                      Phone:
                      <input className="num-input" type="phone" name="phone" value={formValues.phone || ''} onChange={handleChange} />
                    </label>
                    <label>
                      Start Date:
                      <input type="date" name="startDate" value={formValues.startDate || ''} onChange={handleChange} />
                    </label>
                    <label>
                      End Date:
                      <input type="date" name="endDate" value={formValues.endDate || ''} onChange={handleChange} />
                    </label>
                    <label>
                      Start Time:
                      <input type="time" name="startTime" value={formValues.startTime || ''} onChange={handleChange} />
                    </label>
                    <label>
                      End Time:
                      <input type="time" name="endTime" value={formValues.endTime || ''} onChange={handleChange} />
                    </label>
                  </div>

                    


                  </div>
                  {uploading ? (
                    <div>Uploading...</div> // Render uploading indicator
                  ) : (
                    <button type="submit">Create/Update Event</button>
                  )}
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default PostEvent;
