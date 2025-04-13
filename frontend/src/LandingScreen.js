// LandingScreen.js
import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from './logo.png'; 
import './style.css';

function LandingScreen() {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <img 
          src={logoImage} 
          alt="Headshot Hub Logo" 
          className="landing-logo"
        />
        <h1>Welcome to Headshot Hub!</h1>
        <p>Select a game to track your stats:</p>
      </header>
      <div className="landing-buttons">
        <Link to="/csgo" className="landing-button">CS:GO Stats</Link>
        <Link to="/apex" className="landing-button">Apex Legends Stats</Link>
        <Link to="/splitgate" className="landing-button">Splitgate Stats</Link>
        <Link to="/division2" className="landing-button">The Division 2 Stats</Link>
      </div>
    </div>
  );
}

export default LandingScreen;
