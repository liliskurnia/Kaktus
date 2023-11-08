//hook for login logout and authorization checks
import PropTypes from 'prop-types';

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(localStorage.getItem('user'));

  const login = async () => {
    setAuthenticated(true);
    console.log('authenticated');
  };

  const logout = () => {
    setAuthenticated(false);
    console.log('authentication removed');
  };

  return <AuthContext.Provider value={{ isAuthenticated: isAuthenticated, login: login, logout: logout }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const useAuth = () => {
  return useContext(AuthContext);
};
