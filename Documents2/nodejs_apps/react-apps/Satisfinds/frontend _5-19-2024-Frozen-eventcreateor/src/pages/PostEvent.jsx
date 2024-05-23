import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { fetchUserData } from '../api/userApi'; // Import API functions for fetching and updating user data
import { fetchUserEventData, updateUserEvent, createUserEvent } from '../api/eventApi';
import { Link, Navigate } from 'react-router-dom';
import QRCode from '../components/QRcode'
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
      

      try {

        const eventData = await fetchUserEventData(user.email);
        const userData = await fetchUserData(user.email);

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
          await createUserEvent(user.email, eventData);

          
        }
        
        setUserData(userData);
        setEventData(eventData);
        
        setFormValues({
          eventname: eventData.eventname || '',
          username: userData.username || '',
          email: userData.email || '',          
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
          textColor: eventData.textColor || '',
          backgroundColor: eventData.backgroundColor || '',
          backgroundImage: eventData.backgroundImage || '',
          backgroundType: eventData.backgroundType || 'image',
          links: eventData.links || [],
          socialMedia: {
            facebook: eventData.socialMedia.facebook || '',
            twitter: eventData.socialMedia.twitter || '',
            instagram: eventData.socialMedia.instagram || '',
            linkedin: eventData.socialMedia.linkedin || '',
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
      console.error('Error updating user event:', error);
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
  

  if (redirectToLogin) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  return (
    <div className="container-2">
      <div className="dashboard">
        {loading ? (
          // Render loading indicator while data is being fetched
          <div><img src={spinner} alt="Searching Satisfinds..." /></div>
        ) : (
          <>
            <div className="top-links">
            <Link to={`/events/${eventData.eventname}`}>View Your Event!</Link>
              <Link to={`/public/${userData.name}`}>View Public Page</Link>
           
            </div>
  
            <h2>{`Welcome ${userData.username || 'User - Username'} !`}</h2>
            {userData && (
              <h1>{`${userData.name || 'User - Name'}'s Events`}</h1>
              
            )}
           
            <div className="profile" style={{ 
              backgroundImage: formValues.backgroundType === 'image' ? `url(${formValues.backgroundImage})` : 'none',
              backgroundColor: formValues.backgroundType === 'color' ? formValues.backgroundColor : 'transparent',
              color: formValues.textColor,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
              }}>

              <div className="profile-cage">

              <div className="info-div">

                    <div className="info-div-header">
                      <h3>{`${userData.name || 'User - Name'}`}</h3>
                      <h3>{`${eventData.eventname || 'User - Name'}`}</h3>
                      <p>{`${userData.tagline || 'User - Tagline'}`}</p>
                    </div>

                    <div className="bio">
                      
                    </div>

                    <div>
                      <p>{`${userData.address || 'User - Address'}`}</p>
                      <p>{`${userData.city || 'User - City'}`}, {`${userData.state || 'User - State'}`} {`${userData.zip || 'User - Zip'}`}</p>
                      <p>{`${userData.phone || 'User - Phone'}`}</p>
                    </div>

                    <div>
                      <p>{`${eventData.price || 'Event - Price'}`}</p>

                      <p>{`${eventData.specialGuests || 'Event - Special Guests'}`}</p>
                      <p>{`${eventData.details || 'Event - Details'}`}</p>
                      <p>{`${eventData.required || 'Event - Required'}`}</p>
                       
                    </div>

                    <div className="dash-social-icons">
                      {formValues.socialMedia.facebook && (
                        <a href={formValues.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="dash-social-icon"><FaFacebook /></a>
                      )}
                      {formValues.socialMedia.twitter && (
                        <a href={formValues.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="dash-social-icon"><FaTwitter /></a>
                      )}
                      {formValues.socialMedia.instagram && (
                        <a href={formValues.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="dash-social-icon"><FaInstagram /></a>
                      )}
                      {formValues.socialMedia.linkedin && (
                        <a href={formValues.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="dash-social-icon"><FaLinkedin /></a>
                      )}
                      {/* Add more social media icons as needed */}
                    </div>                    
                    <div>

                    

                      {userData.links && userData.links.map((link, index) => (
                      <p key={index}>{link}</p>
                      
                      ))}                    

                      </div>
                      <div className="qrcode"><QRCode value={`https://satisfinds.com/public/${userData.name}` } level="H" size={400}/></div>
                    </div>
                
                <div className="column-div">
                {formValues.backgroundImage && (
                <div>
                  <p>background image</p>  
                  <img src={formValues.backgroundImage} alt="Profile" />
                  
                </div>
                )}
              
                {formValues.image && (
                  <div className="images1">
                    <p>image 1</p>
                    <img src={formValues.image1} alt="Profile" />
                    
                  </div>
                )}   
                
                <div className="other-images"> 
                {formValues.image && (
                  <div className="images1">
                    <p>image 2</p>
                    <img src={formValues.image2} alt="Profile" />
                    
                  </div>
                )}  
                
                               
                </div>
            </div>              
            </div>
              
            </div>
  
            {userData && (
              <div className="event-over-form">
                <h2>Adjust your Event(s) as needed:</h2>
                <form onSubmit={handleSubmit}>



                <div className="event-look">
                  <div className="event-background-block">                      
                          <div className="bkgTxt">
                            <label>
                            Background Color:
                            <input type="color" name="backgroundColor" value={formValues.backgroundColor} onChange={handleChange} />
                          </label>
                          <label>
                            Text Color:
                            <input type="color" name="textColor" value={formValues.textColor} onChange={handleChange} />
                          </label>
                          </div> 

                          <div className="toggle-block">
                            <button className="toggle" type="button" onClick={toggleBackgroundType}>
                            {formValues.backgroundType === 'image' ? 'Choose Color Background' : 'Choose Image Background'}
                          </button>  
                          
                          {/* Background Reset Button */}
                          <button className="toggle" type="button" onClick={resetBackground}>
                            Reset Background
                          </button>
                          </div>
                        </div>

                        <div className="uploads"> 
                          <label>
                            <div>Background Image: <input type="file" name="backgroundImage" accept="image/*" onChange={handleImageUpload} /></div>
                          </label>
                          <label>
                             <div>Image 1:<input type="file" name="image" accept="image/*" onChange={handleImageUpload} /></div>
                          </label>
                          <label>
                            <div>Image 2:<input type="file" name="image1" accept="image/*" onChange={handleImageUpload} /></div>
                          </label>             
                        </div>
                        </div>

                

                        <div className="times">
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

                  
                  <div className="form2">
                      <div className="over-form2">
                        <div className="form2-head">
                        <p>Username: {`${userData.name || 'User - Name'}`}</p>                     
                      <p>Email: {`${eventData.email || 'User - Email'}`}</p>
                      </div>

                    <div className="form2-local">
                      
                      
                      <label>
                        Event Name:
                        <input type="text" name="eventname" value={formValues.eventname} onChange={handleChange} />
                      </label>
                      <label>
                        Name:
                        <input type="text" name="name" value={formValues.name} onChange={handleChange} />
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

                    </div>


                    <div className="event-form-area-links">
                   
                      <div className="">{formValues.links.map((link, index) => (
                      <div key={index}>
                        <label>
                          Link {index + 1}:
                          <div className="links"><input type="text" value={link} onChange={(e) => handleLinkChange(e, index)} /><button type="button" onClick={() => removeLink(index)}>Remove</button></div>
                        </label>
                        
                      </div>
                        ))}
                      <button type="button" onClick={addLink}>Add Link</button></div>                    
                        
                      </div>
                    </div>    

                      <div className="form-area">

                        
                      <div className="event-form2-tag">
                        <label>
                        Phone:
                        <input className="num-input" type="phone" name="phone" value={formValues.phone} onChange={handleChange} />
                      </label>                      
                      <label>
                        Special Guests:
                        <input type="text" name="specialGuests" value={formValues.specialGuests} onChange={handleChange} />
                      </label>
                      <label>
                        required:
                        <input type="text" name="required" value={formValues.required} onChange={handleChange} />
                      </label>
                      <label>
                        Price:
                        <input type="currency" name="price" value={formValues.price} onChange={handleChange} />
                      </label>
                      </div>

                      

                    <div className="event-form2-tag">
                      {formValues && (<div className="event-form-area-social">
                      <label>
                        Facebook:
                        <input type="text" name="FaFacebook" value={formValues.socialMedia.facebook} onChange={handleChange} />
                      </label>
                      <label>
                        Twitter:
                        <input type="text" name="FaTwitter" value={formValues.socialMedia.twitter} onChange={handleChange} />
                      </label>
                      <label>
                        Instagram:
                        <input type="text" name="FaInstagram" value={formValues.socialMedia.instagram} onChange={handleChange} />
                      </label>
                      <label>
                       LinkedIn:
                        <input type="text" name="FaLinkedin" value={formValues.socialMedia.linkedin} onChange={handleChange} />
                      </label>
                      </div>  )} 



                      </div> 
                      
                                      
                      </div>

                                   
                    
                                           
                  
                    
                    
                  </div>
                  {uploading ? (
                        <div>Uploading...</div> // Render uploading indicator
                      ) : (
                        <button type="submit">Post/Update Your Event</button>
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

export default PostEvent