import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 1000,
});

instance.interceptors.response.use(response => {
    return response;
}, error => {
    toast.error(error.response.data.message)
})

export default instance