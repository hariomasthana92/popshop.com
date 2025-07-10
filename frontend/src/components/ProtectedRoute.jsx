//import React from 'react';
//import { Navigate } from 'react-router-dom';
//import { isAuthenticated } from '../utils/auth';

//const ProtectedRoute = ({ children }) => {
//  return isAuthenticated() ? children : <Navigate to="/credential" />;
//};

//export default ProtectedRoute;


import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUser, isAuthenticated } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const user = getUser();

  // Not logged in
  if (!isAuthenticated() || !user) {
    return <Navigate to="/credential" replace />;
  }

  // Logged in but role is not allowed for this route
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    const redirectPath =
      user.role === 'buyer'
        ? '/buyer-dashboard'
        : user.role === 'shopkeeper'
        ? '/shopkeeper-dashboard'
        : user.role === 'admin'
        ? '/admin-dashboard'
        : '/';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
