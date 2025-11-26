import { useContext } from 'react';

import './Dashboard.css';

import { UserContext } from '../../context/UserContext';

import { useEffect } from 'react';

const Dashboard = () => {
  const { user, fetchUserProfile, type } = useContext(UserContext);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div>
      <h2>Welcome {user.name} TYPE OF {type}</h2>
    </div>
  );
};

export default Dashboard;
