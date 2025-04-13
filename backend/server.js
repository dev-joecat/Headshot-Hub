// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const verifyToken = require('./verifyToken');
const router = express.Router();

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;

// Function to normalize stats from Tracker.gg API response
function normalizeCsgoStats(data) {
  const stats = data.data.stats;
  // NOTE: The exact keys may differ based on Tracker.gg's API responses.
  // Adjust the code below based on the actual structure.
  const kills = stats.kills ? stats.kills.value : 0;
  const deaths = stats.deaths ? stats.deaths.value : 0;
  const kdRatio = deaths > 0 ? (kills / deaths).toFixed(2) : kills;
  return { kills, deaths, kdRatio };
}

// GET endpoint to fetch CS:GO stats for a given user
app.get('/api/stats/csgo/:platform/:platformUserIdentifier', async (req, res) => {
  try {
    // Check if dummy mode is enabled via an environment variable.
    if (process.env.USE_DUMMY === 'true') {
      // Return dummy CS:GO stats
      return res.json({
        kills: 120,
        deaths: 60,
        kdRatio: 2.0
      });
    }
    
    const { platform, platformUserIdentifier } = req.params;
    // Hardcoding the platform as "steam" regardless of what is passed.
    const trackerApiUrl = `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${platformUserIdentifier}`;
    console.log(`Fetching data from: ${trackerApiUrl}`);

    const response = await axios.get(trackerApiUrl, {
      headers: {
        'TRN-Api-Key': process.env.TRACKER_API_KEY || 'e8f99a26-ee90-483e-ae50-04447b7a6427'
      }
    });
    
    return res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Tracker.gg:', JSON.stringify({
      message: error.message,
      status: error.response && error.response.status,
      data: error.response && error.response.data,
      headers: error.response && error.response.headers,
    }, null, 2));
    return res.status(500).json({ error: 'Failed to fetch data from Tracker.gg.' });
  }
});


// GET endpoint to fetch Apex Legends stats for a given user
app.get('/api/stats/apex/:platformUserIdentifier', async (req, res) => {
  try {
    if (process.env.USE_DUMMY === 'true') {
      return res.json({
        kills: 250,
        deaths: 125,
        kdRatio: 2.0
      });
    }
    
    const { platformUserIdentifier } = req.params;
    // Hardcoding the platform as "origin" for Apex Legends.
    const trackerApiUrl = `https://public-api.tracker.gg/v2/apex/standard/profile/origin/${platformUserIdentifier}`;
    console.log(`Fetching data from: ${trackerApiUrl}`);

    const response = await axios.get(trackerApiUrl, {
      headers: {
        'TRN-Api-Key': process.env.TRACKER_API_KEY || 'e8f99a26-ee90-483e-ae50-04447b7a6427'
      }
    });
    
    return res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Tracker.gg for Apex Legends:', JSON.stringify({
      message: error.message,
      status: error.response && error.response.status,
      data: error.response && error.response.data,
      headers: error.response && error.response.headers,
    }, null, 2));
    return res.status(500).json({ error: 'Failed to fetch data from Tracker.gg for Apex Legends.' });
  }
});

// GET endpoint to fetch The Division 2 stats for a given user
app.get('/api/stats/division2/:platform/:platformUserIdentifier', async (req, res) => {
  try {
    if (process.env.USE_DUMMY === 'true') {
      return res.json({
        kills: 200,
        deaths: 150,
        kdRatio: (200 / 150).toFixed(2)
      });
    }
    
    const { platform, platformUserIdentifier } = req.params;
    // We are hardcoding the platform as "ubi" for The Division 2 stats.
    const trackerApiUrl = `https://public-api.tracker.gg/v2/division-2/standard/profile/ubi/${platformUserIdentifier}`;
    console.log(`Fetching data from: ${trackerApiUrl}`);

    const response = await axios.get(trackerApiUrl, {
      headers: {
        'TRN-Api-Key': process.env.TRACKER_API_KEY || 'e8f99a26-ee90-483e-ae50-04447b7a6427'
      }
    });
    
    return res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Tracker.gg for The Division 2:', JSON.stringify({
      message: error.message,
      status: error.response && error.response.status,
      data: error.response && error.response.data,
      headers: error.response && error.response.headers,
    }, null, 2));
    return res.status(500).json({ error: 'Failed to fetch data from Tracker.gg for The Division 2.' });
  }
});

// GET endpoint to fetch Splitgate stats for a given user
app.get('/api/stats/splitgate/:platform/:platformUserIdentifier', async (req, res) => {
  try {
    if (process.env.USE_DUMMY === 'true') {
      return res.json({
        kills: 150,
        deaths: 100,
        kdRatio: (150/100).toFixed(2)
      });
    }
    
    const { platform, platformUserIdentifier } = req.params;
    // Construct the Tracker.gg API URL for Splitgate. Ensure that the platform value
    // is one of "steam", "xbl", or "psn".
    const trackerApiUrl = `https://public-api.tracker.gg/v2/splitgate/standard/profile/${platform}/${platformUserIdentifier}`;
    console.log(`Fetching data from: ${trackerApiUrl}`);

    const response = await axios.get(trackerApiUrl, {
      headers: {
        'TRN-Api-Key': process.env.TRACKER_API_KEY || 'e8f99a26-ee90-483e-ae50-04447b7a6427'
      }
    });
    
    return res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Tracker.gg for Splitgate:', JSON.stringify({
      message: error.message,
      status: error.response && error.response.status,
      data: error.response && error.response.data,
      headers: error.response && error.response.headers,
    }, null, 2));
    return res.status(500).json({ error: 'Failed to fetch data from Tracker.gg for Splitgate.' });
  }
});



// Test route to ensure the server is running
app.get('/', (req, res) => {
  res.send('Headshot Hub Backend is running.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
