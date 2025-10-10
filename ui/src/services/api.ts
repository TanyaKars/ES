import axios from 'axios';
import { User, CreateUserDto, UpdateUserDto, ApiResponse } from '@es/shared';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API functions
export const userApi = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get<ApiResponse<User[]>>('/users');
    return response.data.data || [];
  },

  getById: async (id: string): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);
    if (!response.data.data) {
      throw new Error('User not found');
    }
    return response.data.data;
  },

  create: async (userData: CreateUserDto): Promise<User> => {
    const response = await api.post<ApiResponse<User>>('/users', userData);
    if (!response.data.data) {
      throw new Error('Failed to create user');
    }
    return response.data.data;
  },

  update: async (id: string, userData: UpdateUserDto): Promise<User> => {
    const response = await api.put<ApiResponse<User>>(`/users/${id}`, userData);
    if (!response.data.data) {
      throw new Error('Failed to update user');
    }
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};

// Health check
export const healthCheck = async (): Promise<{ status: string; timestamp: string }> => {
  const response = await api.get('/health');
  return response.data;
};