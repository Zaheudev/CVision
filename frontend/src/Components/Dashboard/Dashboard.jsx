import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

import useAuth from '../../hooks/useAuth';

const Dashboard = () => {
  const { getToken, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(token || '');
      alert('Token copiat in clipboard');
    } catch (e) {
      console.log('Copy failed', e);
    }
  };

  return (
    <div>
      <h2>Dashboard (Test)</h2>
    </div>
  );
};

export default Dashboard;
