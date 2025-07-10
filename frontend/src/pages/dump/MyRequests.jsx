import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/api';
import './MyRequests.css';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('/api/requests/my');
        setRequests(res.data.requests);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
    fetchRequests();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      try {
        await axios.delete(`/api/requests/${id}`);
        setRequests(requests.filter(req => req._id !== id));
      } catch (error) {
        console.log('Error deleting request:', error);
        alert('Failed to delete the request.');
      }
    }
  };

  const handleViewResponses = (id) => {
    navigate(`/responses/${id}`);
  };

  return (
    <div className="my-requests">
      <h2>My Requests</h2>
      {requests.map((request) => (
        <div key={request._id} className="request-card">
          <h3>{request.productname}</h3>
          <p><strong>Quantity:</strong> {request.productquantity}</p>
          <p>
            <strong>Status:</strong>{' '}
            <span className={`status ${request.status.toLowerCase()}`}>
              {request.status}
            </span>
          </p>
          <div className="button-group">
            <button className="view-button" onClick={() => handleViewResponses(request._id)}>
              View Responses
            </button>
            <button className="delete-button" onClick={() => handleDelete(request._id)}>
              Delete Request
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyRequests;
