import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Replace with your actual backend URL
  timeout: 10000, // Request timeout
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request Config:", config); 
    return config;
  },
  (error) => {
    console.error("Request Error:", error); 
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response, 
  (error) => {
    console.error("Response Error:", error.response || error.message); 
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
