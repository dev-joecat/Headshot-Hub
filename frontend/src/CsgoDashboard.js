// src/CsgoDashboard.js
import React, { useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

function CsgoDashboard() {
  const [steamId, setSteamId] = useState('');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate the input Steam ID
    if (!steamId.trim()) {
      setError('Please enter a valid Steam ID.');
      return;
    }
  
    setLoading(true);
    setError('');
  
    try {
      // Make a GET request to your backend that calls the Tracker.gg CS:GO API.
      // The endpoint hardcodes the platform as "steam" and appends the entered Steam ID.
      const response = await axios.get(
        `http://localhost:5000/api/stats/csgo/steam/${steamId.trim()}`
      );
      
      // Update the state with the returned stats
      setStats(response.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching CS:GO stats from Tracker.gg.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleReset = () => {
    setSteamId('');
    setStats(null);
    setError('');
  };

  return (
    <div className="dashboard-container">
    <header className="dashboard-header">
      <img 
        src="/images/cs2Logo.png" 
        alt="CS2 Logo" 
        className="logo" 
      />
      <h1>CS:GO Stats</h1>
    </header>
      <main className="dashboard-main">
        {!stats ? (
          <div className="form-container">
            <h2>Enter Your Steam ID</h2>
            {error && <p className="error-message">{error}</p>}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Steam ID"
                  value={steamId}
                  onChange={(e) => setSteamId(e.target.value)}
                />
                <button type="submit">Get Stats</button>
              </form>
            )}
          </div>
        ) : (
          <div className="stats-container">
            <h2>CS:GO Performance Dashboard</h2>
            <button onClick={handleReset} className="reset-button">Reset</button>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Kills</h3>
                <p>{stats.kills || 'N/A'}</p>
              </div>
              <div className="stat-card">
                <h3>Total Deaths</h3>
                <p>{stats.deaths || 'N/A'}</p>
              </div>
              <div className="stat-card">
                <h3>K/D Ratio</h3>
                <p>{stats.kdRatio || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CsgoDashboard;
