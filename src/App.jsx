import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateTrip from './pages/Trip/CreateTrip';
import SmartPlanner from './pages/Trip/SmartPlanner';
import CityExplorer from './pages/Explore/CityExplorer';
import BudgetPlanner from './pages/Tools/BudgetPlanner';
import ChecklistNotes from './pages/Tools/ChecklistNotes';
import ShareItinerary from './pages/Sharing/ShareItinerary';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/planner" element={<CreateTrip />} />
        <Route path="/planner/builder" element={<SmartPlanner />} />
        <Route path="/explore" element={<CityExplorer />} />
        <Route path="/budget" element={<BudgetPlanner />} />
        <Route path="/notes" element={<ChecklistNotes />} />
        <Route path="/shared" element={<ShareItinerary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
