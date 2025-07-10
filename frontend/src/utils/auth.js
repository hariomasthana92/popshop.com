// Save token and user info to localStorage
export const setAuthData = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  // Get token from localStorage
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  // Get user info from localStorage
  export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  
  // Clear auth data on logout
  export const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };
  
  export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };
  