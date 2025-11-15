import { createContext, useState, useEffect } from 'react';

import auth, { getToken } from "../utils/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(auth.getToken());
  
  const login = async (userData) => {
    auth.setToken(userData.token, userData.id);
    setUser(userData);
    console.log('User logged in:', userData);
  };
  const logout = () => {
    setUser(null);
    auth.clearToken();
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getToken: auth.getToken }}>
      {children}
    </AuthContext.Provider>
  );
};
