import { AxiosError } from 'axios';
import { User } from '../types/auth';
import { PaginatedResponse } from '../types/paginated';
import { CountResponse } from '../types/countResponse';
import { api } from '../axios';
import { handleError } from './errors';

export const userHandlers = {
  async getUserProfile(): Promise<User> {
    try {
      const response = await api.get<User>('/api/v1/users/profile');
      return response.data;
    } catch (error) {
      console.error('Get user profile error:', error);
      throw handleError(error as AxiosError);
    }
  },

  async getUsers(limit = 10, offset = 0): Promise<PaginatedResponse<User>> {
    try {
      const response = await api.get<PaginatedResponse<User>>(
        `/api/v1/users?limit=${limit}&offset=${offset}`
      );
      return response.data;
    } catch (error) {
      console.error('Get users error:', error);
      throw handleError(error as AxiosError);
    }
  },

  async getUserById(id: string): Promise<User> {
    try {
      const response = await api.get<User>(`/api/v1/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get user by ID error:', error);
      throw handleError(error as AxiosError);
    }
  },

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    try {
      const response = await api.put<User>(`/api/v1/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error('Update user error:', error);
      throw handleError(error as AxiosError);
    }
  },

  async deleteUser(id: string): Promise<void> {
    try {
      await api.delete(`/api/v1/users/${id}`);
    } catch (error) {
      console.error('Delete user error:', error);
      throw handleError(error as AxiosError);
    }
  },

  async getUsersCount(): Promise<CountResponse> {
    try {
      const response = await api.get<CountResponse>('/api/v1/users/count');
      return response.data;
    } catch (error) {
      console.error('Get users count error:', error);
      throw handleError(error as AxiosError);
    }
  },
};
