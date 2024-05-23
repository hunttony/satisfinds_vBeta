import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { fetchUserData, updateUser } from '../api/userApi'; // Import API functions for fetching and updating user data
import { Link, Navigate } from 'react-router-dom';
import QRCode from '../components/QRcode'
import '../styles/Dashboard.css';
import spinner from '../content/images/Bean Eater@1x-1.0s-200px-200px.svg';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';


const Dashboard = () => {
  // Use auth hook to access user information
  const { user } = useAuth();

  // State variables to store user data, form inputs, and uploaded images
  const [userData, setUserData] = useState(null);
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    name: '',
    address: '',
    phone: '',
    city: '',
    state: '',
    zip: '',
    cuisine: '', 
    tagline:'',
    tags:'',    
    bio: '',
    image: '', // Single image URL
    image1: '', // Additional image URLs
    image2: '', // Additional image URLs
    textColor: '', // New field for text color
    backgroundColor: '', // New field for background color
    backgroundImage: '', // New field for background image
    backgroundType: 'image',// Background color
    links: [],
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      // Add more social media platforms as needed
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
        const data = await fetchUserData(user.email);
        setUserData(data);
        setFormValues({
          username: data.username || '',
          name: data.name || '',
          address: data.address || '',
          phone: data.phone || '',
          city: data.city || '',
          state: data.state || '',
          zip: data.zip || '',
          cuisine: data.cuisine || '', 
          tagline: data.tagline || '',
          tags: data.tags || '',    
          email: data.email || '', 
          bio: data.bio || '',
          image: data.image || '',
          image1: data.image1 || '', // Set additional image URLs if available
          image2: data.image2 || '', // Set additional image URLs if available
          textColor: data.textColor || '',
          backgroundColor: data.backgroundColor || '',
          backgroundImage: data.backgroundImage || '',
          backgroundType: data.backgroundType || 'image', // Background color
          links: data.links || [],
          socialMedia: {            // Preserve existing social media links
            facebook: data.facebook || '', // Update Facebook link
            twitter: data.twitter || '', // Update Twitter link
            instagram: data.instagram || '',
            linkedin: data.linkedin || '',
            // Add more social media platforms as needed
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
      await updateUser(user.email, formValues);
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
            <Link to={`/postevent`}>Post an event!</Link>
              <Link to={`/public/${userData.name}`}>View Public Page</Link>
           
            </div>
  
            <h2>{`Welcome ${userData.username || 'User - Username'} !`}</h2>
            {userData && (
              <h1>{`${userData.name || 'User - Name'}'s Dashboard`}</h1>
              
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
                      <p>{`${userData.tagline || 'User - Tagline'}`}</p>
                    </div>

                    <div className="bio">
                      <p>{`${userData.cuisine || 'User - Cuisine'}`}</p>
                      <p>{`${userData.bio || 'User - Bio'}`}</p>
                    </div>

                    <div>
                      <p>{`${userData.address || 'User - Address'}`}</p>
                      <p>{`${userData.city || 'User - City'}`}, {`${userData.state || 'User - State'}`} {`${userData.zip || 'User - Zip'}`}</p>
                      <p>{`${userData.phone || 'User - Phone'}`}</p>
                    </div>
                    
                      
                    
                    <div>
                       
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
  
            {userData && (
              <div className="over-form">
                <h2>Adjust your profile as needed:</h2>
                <form onSubmit={handleSubmit}>


                <div className="">
                  <div className="background-block">                      
                      <label>
                        Background Color:
                        <input type="color" name="backgroundColor" value={formValues.backgroundColor} onChange={handleChange} />
                      </label>
                      <label>
                        Text Color:
                        <input type="color" name="textColor" value={formValues.textColor} onChange={handleChange} />
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
                    </div>


                  <div className="form2">

                    <div className="form2-local">
                      <label>
                        Username:
                        <input type="text" name="username" value={formValues.username} onChange={handleChange} />
                      </label>
                      <label>
                        Email:
                        <input type="email" name="email" value={formValues.email} onChange={handleChange} />
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

                    <div className="form2-tag">
                      <label>
                        Phone:
                        <input className="num-input" type="phone" name="phone" value={formValues.phone} onChange={handleChange} />
                      </label>
                      <label>
                        Cuisine:
                        <input type="text" name="cuisine" value={formValues.cuisine} onChange={handleChange} />
                      </label>
                      <label>
                        Tagline:
                        <input type="text" name="tagline" value={formValues.tagline} onChange={handleChange} />
                      </label>
                      <label>
                        Tags:
                        <input type="text" name="tags" value={formValues.tags} onChange={handleChange} />
                      </label>
                      <label>
                        Bio:
                        <textarea className="textarea" name="bio" value={formValues.bio} onChange={handleChange} />
                      </label>
                    </div>                    
                    </div>


                    <div className="form-area">

                    {formValues && (<div className="form-area-social">
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

                    
                      <div className="form-area-links">
                        {formValues.links.map((link, index) => (
                      <div key={index}>
                        <label>
                          Link {index + 1}:
                          <div className="links"><input type="text" value={link} onChange={(e) => handleLinkChange(e, index)} /><button type="button" onClick={() => removeLink(index)}>Remove</button></div>
                        </label>
                        
                      </div>
                        ))}
                      <button type="button" onClick={addLink}>Add Link</button>
                      </div>                    
                        
                      </div>                       
                  
                    
                    
                  
                  {uploading ? (
                        <div>Uploading...</div> // Render uploading indicator
                      ) : (
                        <button type="submit">Update Profile</button>
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

export default Dashboard