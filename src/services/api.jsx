import axios from 'axios';

// Signup function
export const signup = async (formData) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/signup', formData);  // Directly use axios for the request
    return response.data;
  } catch (error) {
    // Forward error to caller for handling
    throw error.response ? error.response.data : { error: 'Network Error' };
  }
};

// Login function
export const login = async (formData) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/auth/login',
      formData, // Send formData as the body
      {
        headers: {
          'Content-Type': 'application/json', // Explicitly set the content type to JSON
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: 'Network Error' };
  }
};

export default axios; 
