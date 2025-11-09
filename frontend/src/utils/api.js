import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

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

export const register = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, formData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


// se poate folosi pentru a face request-uri get catre endpoint-urile protejate precum profilul unui candidat
export const getProtected = async (path) => {
    try {
        const headers = getAuthHeaders();
        const response = await axios.get(`${API_BASE_URL}${path}`, { headers });
        return response.data;
    } catch (err) {
        handleError(err);
    }
}

// asta poate fi folosit pentru a obtine profilul candidatului logat
// dar si functia de mai sus getProtected poate fi folosita la fel de bine.
export const getCandidateProfile = async () => {
    try {
        const headers = getAuthHeaders();
        const response = await axios.get(`${API_BASE_URL}/candidate`, { headers });
        return response.data;
    } catch (err) {
        handleError(err);
    }
}

export default { login, register, getProtected };