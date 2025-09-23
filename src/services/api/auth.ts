import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  User,
} from './types/auth';
import { ApiError } from './types/apiError';
import { API_BASE_URL } from '@/constants/api';

class AuthApi {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: false,
    });
  }

  private getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  private getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refresh_token');
    }
    return null;
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  private setUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  public getUser(): User | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  public isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  public logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  }

  public async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await this.axiosInstance.post<LoginResponse>(
        '/api/v1/auth/login',
        credentials
      );
      const { access_token, refresh_token, user } = response.data;
      this.setTokens(access_token, refresh_token);
      this.setUser(user);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  public async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) return false;
      const response = await this.axiosInstance.post<RefreshTokenResponse>(
        '/api/v1/auth/refresh',
        { refresh_token: refreshToken }
      );
      const { access_token, refresh_token } = response.data;
      this.setTokens(access_token, refresh_token);
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  public async getUserProfile(): Promise<User> {
    try {
      const token = this.getAccessToken();
      const response = await this.axiosInstance.get<User>(
        '/api/v1/users/profile',
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  private handleError(error: AxiosError): Error {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as ApiError;
      switch (status) {
        case 400:
          return new Error(data.error || 'Dados inválidos');
        case 401:
          return new Error('Credenciais inválidas');
        case 403:
          return new Error('Acesso negado');
        case 404:
          return new Error('Recurso não encontrado');
        case 500:
          return new Error('Erro interno do servidor');
        default:
          return new Error(data.error || 'Erro desconhecido');
      }
    }
    if (error.request) {
      return new Error('Erro de conexão com o servidor');
    }
    return new Error('Erro desconhecido');
  }
}

export const authApi = new AuthApi();
export default authApi;
