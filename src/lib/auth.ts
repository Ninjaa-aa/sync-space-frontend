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

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    // Handle Axios errors
    if (!error.response) {
      return 'Network error. Please check your connection.';
    }
    return error.response.data?.message || `Error: ${error.response.status}`;
  }
  // Handle other errors
  return error instanceof Error ? error.message : 'An unexpected error occurred';
};

export default authApi;