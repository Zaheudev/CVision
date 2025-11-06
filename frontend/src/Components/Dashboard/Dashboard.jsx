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
    <div className="dashboard-container">
      <h2>Dashboard (Test)</h2>
      <div className="dashboard-card">
        <label>JWT token (local):</label>
        <pre className="token-box">{getToken() || 'No token saved'}</pre>
        <div className="actions">
          <button onClick={handleCopy} disabled={!getToken()}>Copy token</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
