// src/lib/auth.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add request interceptor to add token
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle 401 errors
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear tokens on authentication error
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    return Promise.reject(error);
  }
);

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'Network error. Please check your connection.';
    }
    return error.response.data?.message || `Error: ${error.response.status}`;
  }
  return error instanceof Error ? error.message : 'An unexpected error occurred';
};

// Default export for convenience
export default authApi;