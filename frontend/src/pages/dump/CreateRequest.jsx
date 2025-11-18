import React, { useState } from 'react';
import axios from '../../api/api';
import './CreateRequest.css';

const CreateRequest = () => {
  const [productname, setProductName] = useState('');
  const [productquantity, setProductQuantity] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/requests/create', {
        productname,
        productquantity,
        location
      });
      alert('Request created!');
      setProductName('');
      setProductQuantity('');
      setLocation('');
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
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateRequest;
