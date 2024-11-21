import axios from 'axios';

// Axios instance for shared base configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

// Signup function
export const signup = async (formData) => {
  try {
    const response = await axiosInstance.post('/auth/signup', formData);
    return response.data;
  } catch (error) {
    // Forward error to caller for handling
    throw error.response ? error.response.data : { error: 'Network Error' };
  }
};

// Login function
export const login = async (formData) => {
  try {
    const response = await axiosInstance.post('/auth/login', formData);
    return response.data;
  } catch (error) {
    // Forward error to caller for handling
    throw error.response ? error.response.data : { error: 'Network Error' };
  }
};

// Export axiosInstance if needed elsewhere
export default axiosInstance;
