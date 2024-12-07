import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const workspaceApi = {
  initialize: async (name: string) => {
    const response = await api.post('/workspaces/initialize', { name });
    return response.data;
  },

  updateAdmin: async (workspaceId: string, adminName: string) => {
    const response = await api.patch(`/workspaces/${workspaceId}/admin`, { adminName });
    return response.data;
  },

  inviteMembers: async (workspaceId: string, emails: string[]) => {
    const response = await api.post(`/workspaces/${workspaceId}/invite`, { emails });
    return response.data;
  },

  addChannel: async (workspaceId: string, name: string) => {
    const response = await api.post(`/workspaces/${workspaceId}/channels`, { name });
    return response.data;
  },
};

export default api;
