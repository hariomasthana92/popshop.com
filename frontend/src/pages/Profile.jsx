import React from 'react';
import { getUser } from '../utils/auth';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const user = getUser();

  return (
    <div className="profile-page">
      <h2>Welcome, {user?.name}</h2>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>

      {user?.role === 'buyer' ? (
        <Link to="/buyer-dashboard">Go to Buyer Dashboard</Link>
      ) : (
        <Link to="/shopkeeper-dashboard">Go to Shopkeeper Dashboard</Link>
      )}
    </div>
  );
};

export default Profile;
