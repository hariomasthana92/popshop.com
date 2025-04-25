// src/pages/Home.jsx
import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to PopShop 🛍️</h1>
      <p>Your local shopping companion — connecting buyers and nearby shopkeepers!</p>
      <div className="home-buttons">
        <Link to="/login" className="home-btn">Login</Link>
        <Link to="/register" className="home-btn">Register</Link>
      </div>
    </div>
  );
};

export default Home;
