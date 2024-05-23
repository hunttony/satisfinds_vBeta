import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Import custom CSS for styling
import { useAuth } from '../auth/AuthContext';

function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="site-name">Satisfinds</Link>
        <button
          className={`menu-button ${isMenuOpen ? 'open' : ''}`}
          onClick={handleMenuToggle}
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>

        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          
        {user ? (
            <>
              <div className="status">
              
                <p className="login-status">Welcome: {user.email}!</p>
                <button onClick={logout}>Logout</button>
              </div>
            </>
          ) : null}
         
          <Link to="/" className="nav-link" onClick={handleMenuClose}></Link>
          <Link to="/linksPage" className="nav-link" onClick={handleMenuClose}>Search</Link>
          <Link to="/events" className="nav-link" onClick={handleMenuClose}>Events</Link>
          <Link to="/about" className="nav-link" onClick={handleMenuClose}>About</Link>          
          <Link to="/contact" className="nav-link" onClick={handleMenuClose}>Contact</Link>
          
          
          {user && (
          <>
          <Link to="/dashboard" className="nav-link" onClick={handleMenuClose}>Dashboard</Link>
           <Link to="/postevent" className="nav-link" onClick={handleMenuClose}>Post an Event</Link>
          </>          
          )}
          
          {!user && (
            <>              
              <Link to="/signup" className="nav-link" onClick={handleMenuClose}>Sign Up</Link>
              <Link className="login-button" to="/login"  onClick={handleMenuClose}>Login</Link>
            </>
          )}
          
        </nav>
      </div>
    </header>
  );
}

export default Header;
