import axios from 'axios';
import {toast } from 'react-toastify';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const registerUser = async ({name,email,password}) => {
    try {
        const reqUrl = `${backendUrl}/auth/v1/register`;
        const reqPayload = {name,email,password};
        const response = await axios.post(reqUrl, reqPayload)
        return response.data;
    } catch (error) {
         toast.error('Invalid request!');
    }
};

export const loginUser = async ({ email, password }) => {
    try {
        const reqUrl = `${backendUrl}/auth/v1/login`;
        const reqPayload = { email, password };
        const response = await axios.post(reqUrl, reqPayload);
        
       
        if (response.status === 201) {
            return response.data;
        } else {
            toast.error('Invalid login credentials!');
        }
    } catch (error) {
        toast.error('Invalid request!');
    }
};

export const updateUser = async ({ name, password }) => {
    try {
        const reqUrl = `${backendUrl}/auth/v1/update`;
        const reqPayload = { name, password };
        const response = await axios.put(reqUrl, reqPayload);
        
       
        if (response.status === 201) {
            return response.data;
        } else {
            toast.error('Invalid login credentials!');
        }
    } catch (error) {
        toast.error('Invalid request!');
    }
};
