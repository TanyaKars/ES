import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API functions
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// Practice API functions (for QA testing scenarios)
export const practiceApi = {
  // Various endpoints that will have different behaviors for testing
  getUsers: async () => {
    const response = await api.get('/practice/users');
    return response.data;
  },

  createUser: async (userData: any) => {
    const response = await api.post('/practice/users', userData);
    return response.data;
  },

  updateUser: async (id: string, userData: any) => {
    const response = await api.put(`/practice/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await api.delete(`/practice/users/${id}`);
    return response.data;
  },

  // API endpoint that simulates different HTTP status codes for testing
  testStatusCodes: async (statusCode: number) => {
    const response = await api.get(`/practice/status/${statusCode}`);
    return response.data;
  },

  // API endpoint with artificial delays for testing timeouts
  testTimeout: async (delay: number) => {
    const response = await api.get(`/practice/timeout/${delay}`);
    return response.data;
  },
};

// Health check
export const healthCheck = async () => {
  const response = await api.get('/health');
  return response.data;
};