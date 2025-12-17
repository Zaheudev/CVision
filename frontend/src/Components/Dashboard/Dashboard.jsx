import { useContext } from 'react';

import './Dashboard.css';

import { UserContext } from '../../context/UserContext';

import { useEffect } from 'react';

import { generateCv } from '../../utils/api';

const Dashboard = () => {
  const { user, fetchUserProfile, type } = useContext(UserContext);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const generate = async () => {
    try {

      const data = await generateCv();
      console.log("Generated CV Data:", data);
    } catch (err) {
      console.error("Error generating CV:", err);
    }
  }
  return (
    <div>
      <h2>Welcome {user.name} TYPE OF {type} <button onClick={generate}>GENERATE CV</button></h2>
    </div>
  );
};

export default Dashboard;
