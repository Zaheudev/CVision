import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const handlleError = (error) => {
    if(error.response){
        console.log("API Errror: ", error.response.data || "An error occured");
    }else if(error.request){
        console.log("API Error: No response received from server");
    }else{
        console.log("API Error: ", error.message);
    }
}

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    handlleError(error);
  }
};

export const register = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, formData);
    return response.data;
  } catch (error) {
    handlleError(error);
  }
};

export default {
    login,register
};