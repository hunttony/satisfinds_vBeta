import React from 'react';
import '../styles/Hero.css'; // Import your CSS file
import VideoBkg from '../content/video/video2.mp4'
const HeroSection = () => {
  return (
    <div className="hero">
      <video autoPlay loop muted className="video-background">
        <source src={VideoBkg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      <div className="content">
        <h1>Congratulations!</h1> 
        <h2>You've just found the doorway to Elevate Your Brand!</h2>
        <p>Learn more about our services</p>
        <a href="/about">Explore</a>
      </div>
    </div>
  );
};

export default HeroSection;
