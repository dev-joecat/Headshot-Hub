// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingScreen from './LandingScreen';
import CsgoDashboard from './CsgoDashboard';
import ApexDashboard from './ApexDashboard';
import SplitgateDashboard from './SplitgateDashboard';
import Division2Dashboard from './Division2Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/csgo" element={<CsgoDashboard />} />
        <Route path="/apex" element={<ApexDashboard />} />
        <Route path="/splitgate" element={<SplitgateDashboard />} />
        <Route path="/division2" element={<Division2Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
