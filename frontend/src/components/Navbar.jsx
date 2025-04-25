//import React from 'react';
//import { Link } from 'react-router-dom';
//import './Navbar.css';
//
//const Navbar = () => {
//  return (
//    <nav className="navbar">
//      <Link className="logo" to="/">PopShop</Link>
//      <div className="nav-links">
//        <Link to="/login">Login</Link>
//        <Link to="/register">Register</Link>
//      </div>
//    </nav>
//  );
//};
//
//export default Navbar;
//

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { logout, getUser } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h3>PopShop</h3>
      <div>
        <Link to="/">Home</Link>
        {user && <Link to="/profile">Profile</Link>}
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
