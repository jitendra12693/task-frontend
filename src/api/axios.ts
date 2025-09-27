import axios from "axios";
import { getToken, logout } from "../context/authStorage";

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
