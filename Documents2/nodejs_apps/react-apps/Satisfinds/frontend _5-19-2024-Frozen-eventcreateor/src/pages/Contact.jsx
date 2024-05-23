import React from 'react';
import { addContact } from '../api/contactsApi';
import '../styles/Contact.css';



const Contact = () => {

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = {
    name: e.target.elements.name.value,
    email: e.target.elements.email.value,
    message: e.target.elements.message.value
  };
  try {
    await addContact(formData);
    // Handle successful submission (e.g., show success message)
  } catch (error) {
    console.error('Error submitting contact form:', error.message);
    // Handle submission error (e.g., display error message to user)
  }
};

return (
    <div className="container">
      <div className="contact-container">
      <h2 className="contact-heading">Contact Us</h2>

      <div className="form-container">
        <div className="subcontainer">
          <p className="contact-text">Email: info@example.com</p>
          <p className="contact-text">Phone: +1234567890</p>
          {/* Add more contact information here */}
        </div>

        <div className="subcontainer-form">
        <form onSubmit={handleSubmit} className="contact-form">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="4" />

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  
)};

export default Contact;
