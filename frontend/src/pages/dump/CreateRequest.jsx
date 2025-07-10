import React, { useState } from 'react';
import axios from '../../api/api';
import './CreateRequest.css';

const CreateRequest = () => {
  const [productname, setProductName] = useState('');
  const [productquantity, setProductQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('Searching');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/requests/create', {
        productname,
        productquantity,
        price,
        status,
        longitude,
        latitude
      });
      alert('Request created!');
      // Clear form
      setProductName('');
      setProductQuantity('');
      setPrice('');
      setStatus('Searching');
      setLongitude('');
      setLatitude('');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || 'Error creating request');
        console.error("Server responded with:", error.response.data);
      } else {
        alert('Error creating request');
        console.error("Request error:", error);
      }
    }
  };

  return (
    <div className="create-request">
      <h2>Create a Product Request</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={productname}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
          required
        />
        <input
          type="number"
          value={productquantity}
          onChange={(e) => setProductQuantity(e.target.value)}
          placeholder="Enter quantity"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="Searching">Searching</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <input
          type="number"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Enter longitude"
          required
        />
        <input
          type="number"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Enter latitude"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateRequest;
