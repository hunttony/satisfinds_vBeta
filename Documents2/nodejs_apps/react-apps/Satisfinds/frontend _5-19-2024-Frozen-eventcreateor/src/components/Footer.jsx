import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import '../styles/Footer.css'; // Import custom CSS for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="copyright">&copy; {new Date().getFullYear()} Satisfinds. All rights reserved.</p>
        <div className="social-icons">
          <a href="#" className="social-icon"><FaFacebook /></a>
          <a href="#" className="social-icon"><FaTwitter /></a>
          <a href="#" className="social-icon"><FaInstagram /></a>
          <a href="#" className="social-icon"><FaLinkedin /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
