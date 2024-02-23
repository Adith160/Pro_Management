import axios from 'axios';
import { toast } from 'react-toastify';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getTaskSummary = async () => {
  try {
    const reqUrl = `${backendUrl}/tasks/v1/taskSummary`;
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    }
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching task summary:', error);
    toast.error('Failed to fetch task summary. Please try again later.');
    throw error;
  }
  
};
