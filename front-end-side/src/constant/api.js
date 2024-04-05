import { message } from "antd";
import axios from "axios";
const http = axios.create();
const baseURL = 'http://localhost:8080'
http.interceptors.request.use((config)=>{
  return {
    ...config,
    baseURL,
  }
})
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      message.error(error.response.data.message);
    }
    if (error?.response?.status === 403) {
      message.error(error.response.data.message);
    }
    if (error?.response?.status === 404) {
      message.error(error.response.data.message);
    }
    if (error?.response?.status === 500) {
      message.error(error.response.data.message);
    }
  }
);
export default http