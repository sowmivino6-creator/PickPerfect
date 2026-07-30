import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT Token Automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle Response Errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log("API Error:", error.response.data.message);
    } else {
      console.log("Network Error");
    }

    return Promise.reject(error);
  }
);

export default API;