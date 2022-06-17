import axios from "axios";
import { toast } from "react-toastify";

const token = localStorage.getItem('token')

export const $axios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 1000,
});

export const setHeadersToken = (token) => {
    $axios.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
};

$axios.interceptors.response.use(response => {
    return response;
}, error => {
    toast.error(error.response.data.message)
})