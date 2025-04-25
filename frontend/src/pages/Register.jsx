import React, { useState } from 'react';
import axios from '../api/api';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'buyer',
    location: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const coords = formData.location.split(',').map(Number); // "77.123,28.456"
      if (coords.length !== 2) throw new Error("Location must be longitude,latitude");

      await axios.post('/api/auth/register', {
        ...formData,
        coordinates: coords
      });
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert('Something went wrong!');
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" name="name" placeholder="Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <select name="role" onChange={handleChange}>
          <option value="buyer">Buyer</option>
          <option value="shopkeeper">Shopkeeper</option>
        </select>
        <input type="text" name="location" placeholder="Longitude,Latitude" required onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
