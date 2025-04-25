import React from 'react';
import { getUser } from '../utils/auth';
import { Link } from 'react-router-dom';
import './BuyerDashboard.css';

const BuyerDashboard = () => {
  const user = getUser();
  return (
    <div className="dashboard">
      <h2>Buyer Dashboard</h2>
      <div className="profile-page">
        <h2>Welcome, {user?.name}</h2>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
      </div>
      <Link to="/create-request">Create Request</Link>
      <Link to="/my-requests">My Requests</Link>
    </div>
  );
};

export default BuyerDashboard;
