import React, { useEffect, useState } from 'react';
import { getUser } from '../utils/auth';
import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import './BuyerDashboard.css';
import defaultAvatar from './assets/avatar.png';
import axios from '../api/api';
import ResponseCard from '../components/ResponseCard';

const BuyerDashboard = () => {
  const user = getUser();
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    productname: '',
    productquantity: '',
    price: '',
    status: 'Searching',
    longitude: '',
    latitude: '',
  });

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const [responses, setResponses] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

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
        setRequests((prev) => prev.filter((r) => r._id !== id));
      } catch (error) {
        alert('Error deleting request.');
        console.error(error);
      }
    }
  };

  const handleViewResponses = async (id) => {
    setSelectedRequestId(id);
    try {
      const res = await axios.get(`/api/responses/${id}`);
      setResponses(res.data);
    } catch (err) {
      console.error('Error fetching responses:', err);
    }
  };

  const handleAccept = async (responseId) => {
    try {
      await axios.put(`/api/responses/accept/${responseId}`);
      setResponses((prev) =>
        prev.map((r) => (r._id === responseId ? { ...r, status: 'accepted' } : r))
      );
    } catch (err) {
      alert('Error accepting response');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/requests/create', form);
      alert('Request created!');
      setForm({
        productname: '',
        productquantity: '',
        price: '',
        status: 'Searching',
        longitude: '',
        latitude: '',
      });
    } catch (error) {
      alert('Error creating request');
      console.error(error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="avatar-section">
          <img src={defaultAvatar} alt="User Avatar" className="avatar" />
          <div className="user-info">
            <h2>{user?.name || 'Anonymous User'}</h2>
            <p>{user?.email || 'def mail'}</p>
            <p className="role-badge">buyer</p>
          </div>
        </div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard-content">
        <div className="card welcome-card">
          <h3>Welcome Back!</h3>
          <p>This is your command center. From here, you can track all your current and past product requests, and raise new ones easily.</p>
        </div>

        <div className="card status-summary">
          <h3>Request Overview</h3>
          <ul>
            <li><span>Current Requests:</span> ⏳ Ongoing...</li>
            <li><span>Completed:</span> ✅ Handled by shopkeepers</li>
            <li><span>Pending:</span> 🔄 Awaiting confirmation</li>
          </ul>
        </div>

        <div className="card tips-card">
          <h3>Pro Tips</h3>
          <ul>
            <li>Include accurate quantity and price to get faster responses.</li>
            <li>Enable location sharing to improve shop match accuracy.</li>
            <li>Use the responses section below to review shopkeeper offers.</li>
          </ul>
        </div>
      </div>

      <div className="dashboard-section-wrapper">
        <div className="my-requests card">
          <h3>My Requests</h3>
          {requests.map((request) => (
            <div key={request._id} className="request-card">
              <h4>{request.productname}</h4>
              <p><strong>Quantity:</strong> {request.productquantity}</p>
              <p><strong>Status:</strong> <span className={`status ${request.status.toLowerCase()}`}>{request.status}</span></p>
              <div className="button-group">
                <button onClick={() => handleViewResponses(request._id)}>View Responses</button>
                <button onClick={() => handleDelete(request._id)} className="delete-button">Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div className="create-request card">
          <h3>Create New Request</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="productname" value={form.productname} onChange={handleChange} placeholder="Product name" required />
            <input type="number" name="productquantity" value={form.productquantity} onChange={handleChange} placeholder="Quantity" required />
            <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="Searching">Searching</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
            <input type="number" name="longitude" value={form.longitude} onChange={handleChange} placeholder="Longitude" required />
            <input type="number" name="latitude" value={form.latitude} onChange={handleChange} placeholder="Latitude" required />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      {selectedRequestId && (
        <div className="view-responses card">
          <h3>Responses for Selected Request</h3>
          {responses.length === 0 ? (
            <p>No responses yet.</p>
          ) : (
            responses.map((res) => (
              <ResponseCard key={res._id} response={res} onAccept={handleAccept} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
