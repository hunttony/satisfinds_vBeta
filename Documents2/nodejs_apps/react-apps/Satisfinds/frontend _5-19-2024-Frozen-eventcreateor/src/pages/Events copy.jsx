import React, { useState, useEffect } from 'react';
import { fetchLinksPageData } from '../api/linksApi';
import { Link } from 'react-router-dom';
import '../styles/Events.css';
import VideoBkg from '../content/video/food_video.mp4';
import spinner from '../content/images/Bean Eater@1x-1.0s-200px-200px.svg';

const Events = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLinksPageData(); // No need to pass userEmail
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const spinner = document.getElementById("spinner-container");
    let posX = window.innerWidth / 2 - 100; // Initial X position at the center of the screen
    let posY = window.innerHeight / 2 - 100; // Initial Y position at the center of the screen
    let speedX = 2; // adjust speed along X axis as needed
    let speedY = 2; // adjust speed along Y axis as needed

    function moveSpinner() {
      // Update position
      posX += speedX;
      posY += speedY;

      // Adjust position when hitting the screen boundaries
      if (posX < 0 || posX > window.innerWidth - 200) {
        speedX *= -1; // Reverse direction
      }
      if (posY < 0 || posY > window.innerHeight - 200) {
        speedY *= -1; // Reverse direction
      }

      // Update spinner position
      spinner.style.left = posX + "px";
      spinner.style.top = posY + "px";

      // Loop animation
      requestAnimationFrame(moveSpinner);
    }

    // Start moving the spinner
    moveSpinner();
  }, []);

  return (
    <div className="pre-container">
      <video autoPlay loop muted className="video-background">
        <source src={VideoBkg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="message">
        <h1>Stay Tuned...</h1>
        <h2>Events Near You Coming Soon!</h2>
      </div>

      <div id="spinner-container">
        <img id="spinner" src={spinner} alt="Searching Satisfinds..." />
      </div>
    </div>
  );
};

export default Events;
