import axios from "axios";
import { getToken, logout } from "../context/authStorage";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://localhost:5001/api",
  headers: { "Content-Type": "application/json" },
});

// attach token
api.interceptors.request.use((cfg) => {
  const token = getToken();
  if (token && cfg.headers) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// global 401 -> logout
api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response && err.response.status === 401) {
      logout();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;


// Example async error handler for demonstration
 export const handleAsyncError = async (type:any, message:any) => {
    try {
      
      // Simulate async error (replace with real API call)
      await new Promise((_, reject) => setTimeout(() => reject(new Error("Async error example!")), 1000));
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred.");
    }
  };