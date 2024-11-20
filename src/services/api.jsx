import axios from 'axios';
import { useCookies } from 'react-cookie';

// Create an Axios instance with the token (if present) in cookies
export const useApi = () => {
  const [cookies] = useCookies(['token']);

  // Configure axios instance with Authorization token if available
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
      Authorization: cookies.token ? `Bearer ${cookies.token}` : '',
    },
  });

  return axiosInstance;
};

// Signup function without hooks inside it
export const signup = async (formData) => {
  // Get the token from cookies in a normal way
  const [cookies] = useCookies(['token']);
  
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
      Authorization: cookies.token ? `Bearer ${cookies.token}` : '',
    },
  });

  try {
    const response = await axiosInstance.post('/auth/signup', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Login function
export const login = async (formData) => {
  // Get the token from cookies in a normal way
  const [cookies] = useCookies(['token']);

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
      Authorization: cookies.token ? `Bearer ${cookies.token}` : '',
    },
  });

  try {
    const response = await axiosInstance.post('/auth/login', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default useApi;
