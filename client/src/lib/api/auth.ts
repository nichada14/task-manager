import api from './axios'; 
import { RegisterInput, LoginInput, AuthResponse } from '@/types/user';

// Register new user
export const register = async (data: RegisterInput): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

// Login user
export const login = async (data: LoginInput): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

// Get current user info using stored token
export const getMe = async (): Promise<AuthResponse> => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Logout user (server-side cleanup if needed)
export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};
