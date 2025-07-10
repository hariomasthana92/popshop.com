import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Credential from './pages/Credential';
import BuyerDashboard from './pages/BuyerDashboard';
import ShopkeeperDashboard from './pages/ShopkeeperDashboard';

import ViewResponses from './pages/dump/ViewResponses';

import NotFound from './pages/NotFound';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';

//import CursorTrail from './components/CursorTrail';
import Bgpattern from './components/Bgpattern'; // Uncomment if you want to use the background pattern component

const App = () => {
  return (
    <Router>
      <Bgpattern />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/credential" element={<Credential />} />
        <Route path="/buyer-dashboard" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerDashboard /></ProtectedRoute>} />
        <Route path="/shopkeeper-dashboard" element={<ProtectedRoute allowedRoles={['shopkeeper']}><ShopkeeperDashboard /></ProtectedRoute>} />
        <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>}/>
        <Route path="/responses/:requestId" element={<ProtectedRoute allowedRoles={['buyer']}><ViewResponses /></ProtectedRoute>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
