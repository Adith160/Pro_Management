import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

//api for user registration
export const registerUser = async ({ name, email, password }) => {
  try {
    const reqUrl = `${backendUrl}/auth/v1/register`;
    const reqPayload = { name, email, password };
    const response = await axios.post(reqUrl, reqPayload);
    return response.data;
  } catch (error) {
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Invalid request!");
    }
  }
};

//api for user login
export const loginUser = async ({ email, password }) => {
  try {
    debugger;
    const reqUrl = `${backendUrl}/auth/v1/login`;
    const reqPayload = { email, password };
    const response = await axios.post(reqUrl, reqPayload);

    if (response.status === 201) return response.data;
  } catch (error) {
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Invalid request!");
    }
  }
};

//api for updating user
export const updateUser = async ({ name, oldPassword, newPassword }) => {
  try {
    const reqUrl = `${backendUrl}/auth/v1/update`;
    const reqPayload = { name, oldPassword, newPassword };
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    }
    const response = await axios.put(reqUrl, reqPayload);
    if (response.status === 201) {
      return response.data;
    } else {
      toast.error("Invalid login credentials!");
    }
  } catch (error) {
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Invalid request!");
    }
  }
};
