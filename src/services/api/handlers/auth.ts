import { AxiosError, AxiosInstance } from 'axios';
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  User,
} from '../types/auth';
import { handleError } from './errors';
import { api } from '../axios';

export const authHandlers = {
  getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  },

  getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refresh_token');
    }
    return null;
  },

  setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    }
  },

  setUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },

  getUser(): User | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  },

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  },

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>(
        '/api/v1/auth/login',
        credentials
      );

      const { access_token, refresh_token, user } = response.data;
      this.setTokens(access_token, refresh_token);
      this.setUser(user);

      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw handleError(error as AxiosError);
    }
  },

  async refreshToken(axiosInstance: AxiosInstance): Promise<boolean> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        return false;
      }

      const response = await axiosInstance.post<RefreshTokenResponse>(
        '/api/v1/auth/refresh',
        { refresh_token: refreshToken }
      );

      const { access_token, refresh_token } = response.data;
      this.setTokens(access_token, refresh_token);

      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.logout();
      return false;
    }
  },
};
