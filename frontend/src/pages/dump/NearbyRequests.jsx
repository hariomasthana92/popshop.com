import React, { useEffect, useState } from 'react';
import axios from '../../api/api';
import './NearbyRequests.css';

const NearbyRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const res = await axios.get('/api/requests/nearby');
      setRequests(res.data.requests);
    };
    fetchRequests();
  }, []);

  const handleRespond = async (requestid) => {
    try {
      await axios.post('/api/responses/create', {
        requestid,
        hasproduct: true
      });
      alert('Responded to request!');
    } catch (err) {
      alert('Error responding to request');
      console.error(err);
    }
  };

  return (
    <div className="nearby-requests">
      <h2>Nearby Requests</h2>
      {requests.map((req) => (
        <div key={req._id} className="request-card">
          <p>Product: {req.productname}</p>
          <button onClick={() => handleRespond(req._id)}>Respond</button>
        </div>
      ))}
    </div>
  );
};

export default NearbyRequests;
