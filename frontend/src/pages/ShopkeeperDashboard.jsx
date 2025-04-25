import React from 'react';
import { Link } from 'react-router-dom';
import './ShopkeeperDashboard.css';
import { getUser } from '../utils/auth';

const ShopkeeperDashboard = () => {
  const user = getUser();
  return (
    <div className="dashboard">
      <h2>Shopkeeper Dashboard</h2>
      <div className="profile-page">
      <h2>Welcome, {user?.name}</h2>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      </div>
      <Link to="/nearby-requests">Nearby Requests</Link>
    </div>
  );
};

export default ShopkeeperDashboard;
