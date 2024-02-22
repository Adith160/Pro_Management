import axios from 'axios';
import { toast } from 'react-toastify';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

// Set authorization header globally for all axios requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getTaskSummary = async () => {
  try {
    const reqUrl = `${backendUrl}/tasks/v1/taskSummary`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    toast.error('Invalid request!');
    throw error; // Rethrow the error to propagate it to the caller
  }
};
