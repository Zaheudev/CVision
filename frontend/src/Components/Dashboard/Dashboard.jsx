import { useContext } from 'react';

import './Dashboard.css';

import { UserContext } from '../../context/UserContext';

import { useEffect } from 'react';
import { useState } from 'react';

const Dashboard = () => {
  // const { logout } = useAuth();
  // const { user, fetchUserProfile } = useUser();
  const { user, fetchUserProfile } = useContext(UserContext);
  // const [candidateData, setCandidateData] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div>
      <h2>Welcome {user ? user.name : "null"}</h2>
    </div>
  );
};

export default Dashboard;
