import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

import api from '../../utils/api';

import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';
import { useState } from 'react';

const Dashboard = () => {
  const { logout } = useAuth();
  const [candidateData, setCandidateData] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      // toata asta o voi muta intr un context separat, sa se poata accesa datele candidatului de oriunde
      // si sa poti da fetch de oriunde. momentan nu am timp si e doar de test.
      try {
        const res = await api.getProtected("/candidate");
        console.log(res);
        setCandidateData(res);
      } catch (error) {
        console.error('Error fetching candidate profile:', error);
        if (error.status === 401) {
          logout();
        }
      }
    }
    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Welcome {candidateData ? candidateData.name : "null"}</h2>
    </div>
  );
};

export default Dashboard;
