import React, { useEffect, useState } from 'react';
import { getUser } from '../utils/auth';
import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import axios from '../api/api';
import './ShopkeeperDashboard.css';
import defaultAvatar from './assets/avatar.png'; // Use avatar.png or replace with your own



const ShopkeeperDashboard = () => {
  const user = getUser();
  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('/api/requests/nearby');
        setRequests(res.data.requests);
      } catch (err) {
        console.error('Failed to load nearby requests:', err);
      }
    };

    fetchRequests();
  }, []);

  const handleRespond = async (requestid) => {
    try {
      await axios.post('/api/responses/create', {
        requestid,
        hasproduct: true,
      });
      alert('Responded to request!');
    } catch (err) {
      alert('Error responding to request');
      console.error(err);
    }
  };

  return (
    <div className="shopkeeper-dashboard1">
      <div className="dashboard1-header1">
        <div className="avatar1-section1">
          <img src={defaultAvatar} alt="Shopkeeper Avatar" className="avatar1" />
          <div className="user-info1">
            <h2>{user?.name || 'Anonymous User'}</h2>
            <p>{user?.email || 'def mail'}</p>
            <p className="role-badge1">Shopkeeper</p>
          </div>
        </div>
        <button className="logout1-button1" onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard1-content1">
        <div className="card2 overview1-card2">
          <h3>Welcome, {user?.name}!</h3>
          <p>You can view and respond to nearby product requests from buyers in real time.</p>
        </div>

        <div className="card2 nearby2-card2">
          <h3>📍 Nearby Requests</h3>
          {requests.length === 0 ? (
            <p className="no1-req1">No nearby requests available currently.</p>
          ) : (
            <div className="request1-list1">
              {requests.map((req) => (
                <div key={req._id} className="request1-item1">
                  <p><strong>Product:</strong> {req.productname}</p>
                  <p><strong>Quantity:</strong> {req.productquantity}</p>
                  <p><strong>Offered Price:</strong> ₹{req.price}</p>
                  <button className="respond1-btn1" onClick={() => handleRespond(req._id)}>
                    Respond
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopkeeperDashboard;
