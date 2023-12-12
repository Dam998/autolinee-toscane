import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.AT_BASENAME,
  headers: {
    "Content-Type": "application/json",
    timeout: 5000,
  },
});

export default axiosInstance;
