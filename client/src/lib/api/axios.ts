import axios, { InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

// Create an Axios instance with base URL and default headers
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://task-manager-s2qj.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token from localStorage to request headers
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        // Ensure headers are in correct format
        if (!config.headers) {
          config.headers = AxiosHeaders.from({});
        } else if (!(config.headers instanceof AxiosHeaders)) {
          config.headers = AxiosHeaders.from(config.headers);
        }

        config.headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
