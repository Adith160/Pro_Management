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
  } catch (error){
    if(error.response.data.message){
        toast.error(error.response.data.message);
    }else{
        toast.error('Invalid request!');
    }
}
  
};

export const createTasks = async ({ title, dueDate, priority, status, checklists }) => {
  try {
      const reqUrl = `${backendUrl}/tasks/v1/create`;
      const token = localStorage.getItem("token");
      // Include userId as userRefId in the request payload
      const reqPayload = { title, dueDate, priority, status, checklists }

      // Set Authorization header with token
      if (token) {
          axios.defaults.headers.common["Authorization"] = token;
      }

      // Send POST request to the backend
      const response = await axios.post(reqUrl, reqPayload);
      return response.data;
  } catch (error) {
      if (error.response && error.response.data.message) {
          toast.error(error.response.data.message);
      } else {
          toast.error('Invalid request!');
      }
  }
};




