import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Profile from './Components/Pages/Profile';
import Layout from './Layout';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import TicketAssess from './Components/Pages/TicketAssess';
import NewTicket from './Components/Pages/NewTicket';

function App() {
  return (
    <Router>
      <Routes path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/TicketAssess" element={<TicketAssess />} />
        <Route path="/NewTicket" element={<NewTicket />} />
      </Routes>
    </Router>
  );
}

export default App;
