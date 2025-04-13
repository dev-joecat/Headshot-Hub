// src/SplitgateDashboard.js
import React, { useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; 

function SplitgateDashboard() {
  const [platform, setPlatform] = useState('steam'); // default platform
  const [userId, setUserId] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId.trim()) {
      setError('Please enter a valid user ID.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `http://headshot-hub-production.up.railway.app/api/stats/splitgate/${platform}/${userId.trim()}`
      );
      setStats(response.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching Splitgate stats from Tracker.gg.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPlatform('steam');
    setUserId('');
    setStats(null);
    setError('');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
      <img 
        src="/images/splitgateLogo.png" 
        alt="Splitgate Logo" 
        className="logo" 
      />
        <h1>Splitgate Stats</h1>
      </header>
      <main className="dashboard-main">
        {!stats ? (
          <div className="form-container">
            <h2>Enter Your Platform and User ID</h2>
            {error && <p className="error-message">{error}</p>}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="platform">Platform:</label>
                  <select
                    id="platform"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                  >
                    <option value="steam">Steam</option>
                    <option value="xbl">Xbox Live (xbl)</option>
                    <option value="psn">PlayStation Network (psn)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="userId">User ID:</label>
                  <input
                    id="userId"
                    type="text"
                    placeholder="Enter your user ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </div>
                <button type="submit">Get Stats</button>
              </form>
            )}
          </div>
        ) : (
          <div className="stats-container">
            <h2>Splitgate Performance Dashboard</h2>
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

export default SplitgateDashboard;
