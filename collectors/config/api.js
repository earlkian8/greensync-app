import axios from 'axios';

// Use your local IP, not 0.0.0.0 or localhost
export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.254.104:8000/api';

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Optional: Add request/response interceptors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
