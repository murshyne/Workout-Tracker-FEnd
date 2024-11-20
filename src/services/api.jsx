import axios from 'axios';
import { useCookies } from 'react-cookie';

const useApi = () => {

    // Fetch the token from cookies
  const [cookies] = useCookies(['token']);  

  // Set the Authorization header for all axios requests
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
      Authorization: cookies.token ? `Bearer ${cookies.token}` : '',
    },
  });

  return axiosInstance;
};

export default useApi;
