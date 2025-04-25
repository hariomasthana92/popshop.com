import React, { useState } from 'react';
import axios from '../api/api';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { setAuthData } from '../utils/auth';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', formData);
      setAuthData(res.data.token, res.data.user);
      if (res.data.user.role === 'buyer') {
        navigate('/buyer-dashboard');
      } else {
        navigate('/shopkeeper-dashboard');
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message || 'Login failed!');
        console.log("Backend error response:", err.response.data);
      } else {
        alert(err.message || 'An unknown error occurred!');
        console.log("Unknown error:", err);
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
