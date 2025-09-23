import { API_BASE_URL } from '@/constants/api';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { authHandlers } from './handlers/auth';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    const token = authHandlers.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest) {
      try {
        const refreshed = await authHandlers.refreshToken(api);
        if (refreshed) {
          const token = authHandlers.getAccessToken();
          if (token && originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalRequest);
        }
      } catch (refreshError) {
        authHandlers.logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
