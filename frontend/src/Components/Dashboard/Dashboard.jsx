import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { token, clearToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
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
        <pre className="token-box">{token || 'No token saved'}</pre>
        <div className="actions">
          <button onClick={handleCopy} disabled={!token}>Copy token</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
