import React, { useState, useEffect } from 'react';
import { fetchUserEventData, updateUserEvent } from '../api/eventApi';
import { useAuth } from '../auth/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import QRCode from '../components/QRcode';
import '../styles/PostEvent.css';
import spinner from '../content/images/Bean Eater@1x-1.0s-200px-200px.svg';

const PostEvent = () => {
  const { user } = useAuth();
  const [userEventData, setUserEventData] = useState(null);
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    name: '',
    eventName: '',
    address: '',
    phone: '',
    city: '',
    state: '',
    zip: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    price: '',
    specialGuests: [],
    details: '',
    required: '',
    image1: '',
    image2: '',
    textColor: '',
    backgroundColor: '',
    backgroundImage: '',
    backgroundType: 'image',
    links: [],
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    if (!user) {
      setRedirectToLogin(true);
      return;
    }

    const fetchData = async () => {
      
      
      try {
        // Fetch user event data using user's email
        const data = await fetchUserEventData(user.email);
       
        setUserEventData(data);
        
        // Populate form values with user event data or default values if data is null
        setFormValues({
          ...formValues,
          username: user.username || '',
          email: user.email || '',
          name: data ? data.name || '' : '',
          eventName: data ? data.eventName || '' : '',
          address: data ? data.address || '' : '',
          phone: data ? data.phone || '' : '',
          city: data ? data.city || '' : '',
          state: data ? data.state || '' : '',
          zip: data ? data.zip || '' : '',
          startDate: data ? data.startDate || '' : '',
          endDate: data ? data.endDate || '' : '',
          startTime: data ? data.startTime || '' : '',
          endTime: data ? data.endTime || '' : '',
          price: data ? data.price || '' : '',
          specialGuests: data ? data.specialGuests || [] : [],
          details: data ? data.details || '' : '',
          required: data ? data.required || '' : '',
          image1: data ? data.image1 || '' : '',
          image2: data ? data.image2 || '' : '',
          textColor: data ? data.textColor || '': '',
          backgroundColor: data ? data.backgroundColor || '' : '',
          backgroundImage: data ? data.backgroundImage || '' : '',
          backgroundType: data ? data.backgroundType || 'image' : 'image',
          links: data ? data.links || [] : [],
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user event data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user, formValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      // Update user event data with form values
      await updateUserEvent(user.email, formValues);
      // Optionally, show a success message or redirect to events page
    } catch (error) {
      console.error('Error updating user event data:', error);
      // Handle error (e.g., display error message)
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {    
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormValues({ ...formValues, [e.target.name]: reader.result });
    };
  };

  const toggleBackgroundType = () => {
    const newType = formValues.backgroundType === 'image' ? 'color' : 'image';
    setFormValues({ ...formValues, backgroundType: newType });
  };

  const handleLinkChange = (e, index) => {
    const newLinks = [...formValues.links];
    newLinks[index] = e.target.value;
    setFormValues({ ...formValues, links: newLinks });
  };

  const addLink = () => {
    setFormValues({ ...formValues, links: [...formValues.links, ''] });
  };

  const removeLink = (index) => {
    const newLinks = [...formValues.links];
    newLinks.splice(index, 1);
    setFormValues({ ...formValues, links: newLinks });
  };

  

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container-2">
      <div className="dashboard">
        {loading ? (
          <div><img src={spinner} alt="Searching Satisfinds..." /></div>
        ) : (
          <>
            <div className="top-links">
              <Link to={`/public/${user.username}`}>View Public Page</Link>
            </div>
            <h2>{`Welcome ${user.username || 'User - Username'} !`}</h2>
            <h1>{`${userEventData.name || 'User - Name' }'s Event Board`}</h1>
            <div className="profile" style={{
              backgroundImage: formValues.backgroundType === 'image' ? `url(${formValues.backgroundImage})` : 'none',
              backgroundColor: formValues.backgroundType === 'color' ? formValues.backgroundColor : 'transparent',
              color: formValues.textColor ,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}>

              <div className="profile-cage">
                <div className="info-div">
                  <div className="info-div-header">
                    <h3>{`${formValues.eventName || 'User - Name'}`}</h3>
                  </div>
                  <div className="times">
                    <p>{`${formValues.startDate || 'Event - startDate'}`}</p>
                    <p>{`${formValues.endDate || 'Event - endDate'}`}</p>
                    <p>{`${formValues.startTime || 'Event - startTime'}`}</p>
                    <p>{`${formValues.endTime || 'Event - endTime'}`}</p>
                  </div>
                  <div>
                    <p>{`${formValues.address || 'User - Address'}`}</p>
                    <p>{`${formValues.city || 'User - City'}`}, {`${formValues.state || 'User - State'}`} {`${formValues.zip || 'User - Zip'}`}</p>
                    <p>{`${formValues.phone || 'User - Phone'}`}</p>
                  </div>
                  <div>
                    <p>{`${formValues.specialGuests || 'Event - Special Guests'}`}</p>
                    <p>{`${formValues.details || 'Event - Details'}`}</p>
                    <p>{`${formValues.required || 'Event - Required'}`}</p> 
                    <p>{`${formValues.zip || 'Event - Zip'}`}</p>
                    <p>{`${formValues.price || 'Event - Price'}`}</p>
                  </div>
                  <div>
                    {formValues.links && formValues.links.map((link, index) => (
                      <p key={index}>{link}</p>
                    ))}
                  </div>
                  <div className="qrcode">
                    <QRCode value={`https://satisfinds.com/events/${formValues.eventName}`} level="H" size={400} />
                  </div>
                </div>
                <div className="column-div">
                  {formValues.image1 && (
                    <div className="images1">
                      <img src={formValues.image1} alt="Profile" />
                      <p>image 1</p>
                    </div>
                  )}
                  {formValues.image2 && (
                    <div className="images1">
                      <img src={formValues.image2} alt="Profile" />
                      <p>image 2</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="over-form">
              <h2>Post or Modify your event(s) needed:</h2>
              <form onSubmit={handleSubmit}>
                <div className="form2">
                  <div className="form2-local">
                    <label>
                      Username:
                      <input type="text" name="username" value={user.username} readOnly />
                    </label>
                    <label>
                      Email:
                      <input type="email" name="email" value={user.email} readOnly />
                    </label>
                    <label>
                      Name:
                      <input type="text" name="name" value={formValues.name || ''} onChange={handleChange} />
                    </label>
                    <label>
                      Address:
                      <input type="text" name="address" value={formValues.address || ''} onChange={handleChange} />
                    </label>
                    <label>
                      City:
                      <input type="text" name="city" value={formValues.city || ''} onChange={handleChange} />
                    </label>
                    <label>
                      State:
                      <input type="text" name="state" value={formValues.state || ''} onChange={handleChange} />
                    </label>
                    <label>
                      Zip:
                      <input type="text" name="zip" value={formValues.zip || ''} onChange={handleChange} />
                    </label>
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
                  <div className="form-area">
                    <div className="background-block">
                      <label>
                        Background Color:
                        <input type="color" name="backgroundColor" value={formValues.backgroundColor || ''} onChange={handleChange} />
                      </label>
                      <label>
                        Text Color:
                        <input type="color" name="textColor" value={'formValues.textColor' || ''} onChange={handleChange} />
                      </label>
                      <button className="toggle" type="button" onClick={toggleBackgroundType}>
                        {formValues.backgroundType === 'image' ? 'Choose Color Background' : 'Choose Image Background'}
                      </button>
                    </div>
                    <div>
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
                          <input type="text" value={link || ''} onChange={(e) => handleLinkChange(e, index)} />
                          <button type="button" onClick={() => removeLink(index)}>Remove</button>
                        </label>
                      </div>
                    ))}
                    <button type="button" onClick={addLink}>Add Link</button>
                  </div>
                </div>
                {uploading ? (
                  <div>Uploading...</div>
                ) : (
                  <button type="submit">Post/Update Event</button>
                )}
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostEvent;
