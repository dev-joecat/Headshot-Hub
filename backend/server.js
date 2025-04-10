// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Sample authentication endpoints
app.post('/api/auth/register', (req, res) => {
  // You will later integrate Firebase Admin to register new users.
  // For now, return a placeholder response.
  res.json({ message: 'Register endpoint under development.' });
});

app.post('/api/auth/login', (req, res) => {
  // You will later integrate Firebase Admin verification here.
  res.json({ message: 'Login endpoint under development.' });
});

// Test route to verify the server is running
app.get('/', (req, res) => {
  res.send('Headshot Hub Backend is running.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
