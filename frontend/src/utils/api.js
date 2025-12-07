import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';
// URL asta e pt backend-ul deploy-uit pe Heroku. o sa 
// modific sa fie mai usor de folosit atunci cand vrei sa 
// lucrezi local si cand vrei sa lucrezi cu backend-ul deploy-uit.
// daca vrei sa lucrezi local, doar comenteaza linia de mai jos si decomenteaza linia de sus.
// const API_BASE_URL = 'https://cvision-3ad86f96e000.herokuapp.com/api';

const handleError = (error) => {
    if (error.response) {
        console.log('API Error: ', error.response.data || 'An error occured');
    } else if (error.request) {
        console.log('API Error: No response received from server');
    } else {
        console.log('API Error: ', error.message);
    }
    throw error;
}

const getAuthHeaders = () => {
    try {
        const token = localStorage.getItem('token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    } catch (e) {
        return {};
    }
}

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const register = async (formData, role) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register${role}`, formData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// functie pentru a obtine profilul utilizatorului autentificat
export const getProfile = async () => {
    try {
        const headers = getAuthHeaders();
        const response = await axios.get(`${API_BASE_URL}/profile`, { headers });
        return response.data;
    } catch (err) {
        handleError(err);
    }
};

export const updateProfile = async (profileData) => {
    try {
        console.log(profileData);
        const headers = getAuthHeaders();
        const response = await axios.put(`${API_BASE_URL}/candidate/update`, profileData, { headers });
        return response.data;
    } catch (err) {
        handleError(err);
    }
}

export default { login, register, getProfile, updateProfile };