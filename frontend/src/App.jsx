import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BuyerDashboard from './pages/BuyerDashboard';
import ShopkeeperDashboard from './pages/ShopkeeperDashboard';
import CreateRequest from './pages/CreateRequest';
import NearbyRequests from './pages/NearbyRequests';
import ViewResponses from './pages/ViewResponses';
import MyRequests from './pages/MyRequests';
//import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

//<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/buyer-dashboard" element={<ProtectedRoute><BuyerDashboard /></ProtectedRoute>} />
        <Route path="/shopkeeper-dashboard" element={<ProtectedRoute><ShopkeeperDashboard /></ProtectedRoute>} />
        <Route path="/create-request" element={<ProtectedRoute><CreateRequest /></ProtectedRoute>} />
        <Route path="/my-requests" element={<ProtectedRoute><MyRequests /></ProtectedRoute>} />
        <Route path="/responses/:requestId" element={<ProtectedRoute><ViewResponses /></ProtectedRoute>} />
        <Route path="/nearby-requests" element={<ProtectedRoute><NearbyRequests /></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
