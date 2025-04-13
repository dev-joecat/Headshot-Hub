// src/ApexDashboard.js
import React, { useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

function ApexDashboard() {
  const [originId, setOriginId] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originId.trim()) {
      setError('Please enter your Origin ID.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      // Calls the backend endpoint for Apex Legends stats.
      const response = await axios.get(
        `http://localhost:5000/api/stats/apex/${originId.trim()}`
      );
      setStats(response.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching Apex Legends stats from Tracker.gg.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setOriginId('');
    setStats(null);
    setError('');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
      <img 
        src="/images/apexLogo.jpg" 
        alt="Apex Legends Logo" 
        className="logo" 
      />
        <h1>Apex Legends Stats</h1>
      </header>
      <main className="dashboard-main">
        {!stats ? (
          <div className="form-container">
            <h2>Enter Your Origin ID</h2>
            {error && <p className="error-message">{error}</p>}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Origin ID"
                  value={originId}
                  onChange={(e) => setOriginId(e.target.value)}
                />
                <button type="submit">Get Stats</button>
              </form>
            )}
          </div>
        ) : (
          <div className="stats-container">
            <h2>Apex Legends Performance Dashboard</h2>
            <button onClick={handleReset} className="reset-button">
              Reset
            </button>
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

export default ApexDashboard;
