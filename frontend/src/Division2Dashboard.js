// src/Division2Dashboard.js
import React, { useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Ensure your CSS file is imported

function Division2Dashboard() {
  const [platform, setPlatform] = useState('ubi');
  const [userId, setUserId] = useState('');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId.trim()) {
      setError('Please enter a valid user ID.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      // Call the backend endpoint with the selected platform and user ID.
      const response = await axios.get(
        `http://headshot-hub-production.up.railway.app/api/stats/division2/${platform}/${userId.trim()}`
      );

      // ^^^^ previously was       const response = await axios.get(
      //  `http://localhost:5000/api/stats/division2/${platform}/${userId.trim()}`
      //);


      setStats(response.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching stats from Tracker.gg for The Division 2.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPlatform('uplay');
    setUserId('');
    setStats(null);
    setError('');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
      <img 
        src="/images/division2Logo.jpg" 
        alt="Division 2 Logo" 
        className="logo" 
      />
        <h1>The Division 2 Stats</h1>
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
                    <option value="ubi">Ubisoft</option>
                    <option value="xbl">Xbox Live</option>
                    <option value="psn">PlayStation Network</option>
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
            <h2>The Division 2 Performance Dashboard</h2>
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

export default Division2Dashboard;
