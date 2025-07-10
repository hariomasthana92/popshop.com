import React, { useState } from 'react';
import axios from '../api/api';
import { setAuthData } from '../utils/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import './Credential.css';
import MovingImages from '../components/MovingImages';

// ✅ Reuse Navbar styles from homepage
const Navbar = () => (
  <div className="navbar1">
    <h2>🛍️ PopShop</h2>
    <ul>
      <li onClick={() => window.location.href = "/"}>Home</li>
      <li></li>
    </ul>
  </div>
);

// ✅ Initial form state
const initialFormData = {
  name: '',
  email: '',
  password: '',
  role: '',
  location: ''
};

const Credential = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const passedEmail = location.state?.prefillEmail || '';
  const passedMode = location.state?.mode || 'login';
  const [isLogin, setIsLogin] = useState(passedMode !== 'register');
  
  

  const [formData, setFormData] = useState({
    name: '',
    email: passedEmail,
    password: '',
    role: '',
    location: ''
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: passedEmail,
      password: '',
      role: '',
      location: ''
    });
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', formData);
      setAuthData(res.data.token, res.data.user);
      setFormData(initialFormData); // ✅ Clear form after login
      if (res.data.user.role === 'buyer') navigate('/buyer-dashboard');
      else if (res.data.user.role === 'admin') navigate('/DashboardPage');
      else navigate('/shopkeeper-dashboard');
    } catch (err) {
      alert(err?.response?.data?.message || 'Login failed!');
      console.error(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const coords = formData.location.split(',').map(Number);
      if (coords.length !== 2) throw new Error("Location must be longitude,latitude");
      await axios.post('/api/auth/register', { ...formData, coordinates: coords });
      alert('Registration successful!');
      setFormData(initialFormData); // ✅ Clear form after registration
      setIsLogin(true);
    } catch (err) {
      alert('Something went wrong!');
      console.error(err);
    }
  };

  return (
    <div className="auth-wrapper">
      <Navbar />
      <div className="auth-page">
        <div className="home-container">
          <h1>Welcome to PopShop 🛍️</h1>
          <p>Your local shopping companion — connecting buyers and nearby shopkeepers!</p>
        </div>

        <MovingImages />

        <div className="form-container">
          <h2 style={{ color: "#ffffff" }}>{isLogin ? 'Login' : 'Register'}</h2>
          <form onSubmit={isLogin ? handleLogin : handleRegister}>
            {!isLogin && (
              <input type="text" name="name" placeholder="Name" required onChange={handleChange} value={formData.name} />
            )}
            <input type="email" name="email" placeholder="Email" required onChange={handleChange} value={formData.email} />
            <input type="password" name="password" placeholder="Password" required onChange={handleChange} value={formData.password} />
            {!isLogin && (
              <>
                <select name="role" onChange={handleChange} required value={formData.role}>
                  <option value="" disabled hidden>Select Role</option>
                  <option value="buyer">Buyer</option>
                  <option value="shopkeeper">Shopkeeper</option>
                </select>
                <input type="text" name="location" placeholder="Longitude,Latitude" required onChange={handleChange} value={formData.location} />
              </>
            )}
            <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
          </form>
          <button className="toggle-button" onClick={toggleMode}>
            {isLogin ? 'Switch to Register' : 'Switch to Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Credential;
