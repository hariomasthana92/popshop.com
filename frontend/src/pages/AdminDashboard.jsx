import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import avatar from './assets/avatar.png';
import userDistChart from './assets/user_distribution_pie.png';
import requestLineChart from './assets/weekly_requests_line.png';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Replace with actual API calls
    setUsers([
      { id: 1, name: 'Alice', email: 'alice@example.com', role: 'buyer' },
      { id: 2, name: 'Bob', email: 'bob@example.com', role: 'shopkeeper' },
    ]);

    setRequests([
      { id: 1, product: 'Apples', user: 'Alice', status: 'Completed' },
      { id: 2, product: 'Milk', user: 'Bob', status: 'Pending' },
    ]);
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <img src={avatar} alt="Admin Avatar" className="admin-avatar" />
        <div className="admin-info">
          <h2>Welcome, Admin</h2>
          <p>Manage users, requests, and analytics</p>
        </div>
      </div>

      <div className="admin-sections">
        <div className="admin-card">
          <h3>User Overview</h3>
          <ul>
            {users.map(user => (
              <li key={user.id}>
                <span>{user.name} ({user.role})</span>
                <button onClick={() => setSelectedUser(user)}>View</button>
                <button>Edit</button>
                <button>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="admin-card">
          <h3>Requests Summary</h3>
          <ul>
            {requests.map(req => (
              <li key={req.id}>
                <strong>{req.product}</strong> by {req.user} – <em>{req.status}</em>
              </li>
            ))}
          </ul>
        </div>

        <div className="admin-card user-details">
          <h3>User Details</h3>
          {selectedUser ? (
            <div>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
            </div>
          ) : (
            <p>Select a user to view details</p>
          )}
        </div>

        <div className="admin-card analytics">
          <h3>User Distribution</h3>
          <img src={userDistChart} alt="User Distribution" />
        </div>

        <div className="admin-card analytics">
          <h3>Weekly Request Activity</h3>
          <img src={requestLineChart} alt="Request Activity" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
