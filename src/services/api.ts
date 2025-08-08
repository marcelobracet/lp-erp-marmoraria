import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Tipos para a API
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'manager';
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_login_at: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

// Tipos para Clientes
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string; // CPF or CNPJ
  document_type: 'cpf' | 'cnpj';
  address?: Address;
  created_at: string;
  updated_at: string;
}

export interface CreateClientRequest {
  name: string;
  email: string;
  phone: string;
  document: string;
  document_type: 'cpf' | 'cnpj';
  address?: Address;
}

export interface UpdateClientRequest {
  name?: string;
  email?: string;
  phone?: string;
  document?: string;
  document_type?: 'cpf' | 'cnpj';
  address?: Address;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
}

// Tipos para Produtos
export interface Product {
  id: string;
  name: string;
  type: 'marble' | 'granite' | 'service';
  description?: string;
  unit_price: number;
  unit: 'm2' | 'ml' | 'un' | 'kg';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateProductRequest {
  name: string;
  type: 'marble' | 'granite' | 'service';
  description?: string;
  unit_price: number;
  unit: 'm2' | 'ml' | 'un' | 'kg';
  is_active?: boolean;
}

export interface UpdateProductRequest {
  name?: string;
  type?: 'marble' | 'granite' | 'service';
  description?: string;
  unit_price?: number;
  unit?: 'm2' | 'ml' | 'un' | 'kg';
  is_active?: boolean;
}

// Tipos para Listagem
export interface PaginatedResponse<T> {
  data?: T[];
  clients?: T[];
  total: number;
  limit: number;
  offset: number;
}

export interface CountResponse {
  count: number;
}

export interface ApiError {
  error: string;
  details?: Record<string, string>;
}

// Configuração da API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para adicionar token de autorização
    this.axiosInstance.interceptors.request.use(
      config => {
        const token = this.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // Interceptor para lidar com erros de autenticação
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && originalRequest) {
          try {
            const refreshed = await this.refreshToken();
            if (refreshed) {
              // Retry the original request with new token
              const token = this.getAccessToken();
              if (token && originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return this.axiosInstance(originalRequest);
            }
          } catch (refreshError) {
            this.logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Gerenciamento de tokens
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

  // Métodos de autenticação
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
      console.error('Login error:', error);
      throw this.handleError(error as AxiosError);
    }
  }

  public async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        return false;
      }

      const response = await this.axiosInstance.post<RefreshTokenResponse>(
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
  }

  public async getUserProfile(): Promise<User> {
    try {
      const response = await this.axiosInstance.get<User>(
        '/api/v1/users/profile'
      );
      return response.data;
    } catch (error) {
      console.error('Get user profile error:', error);
      throw this.handleError(error as AxiosError);
    }
  }

  // Métodos de usuários (Admin only)
  public async getUsers(
    limit = 10,
    offset = 0
  ): Promise<PaginatedResponse<User>> {
    try {
      const response = await this.axiosInstance.get<PaginatedResponse<User>>(
        `/api/v1/users?limit=${limit}&offset=${offset}`
      );
      return response.data;
    } catch (error) {
      console.error('Get users error:', error);
      throw this.handleError(error as AxiosError);
    }
  }

  public async getUserById(id: string): Promise<User> {
    try {
      const response = await this.axiosInstance.get<User>(
        `/api/v1/users/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Get user by ID error:', error);
      throw this.handleError(error as AxiosError);
    }
  }

  public async updateUser(id: string, userData: Partial<User>): Promise<User> {
    try {
      const response = await this.axiosInstance.put<User>(
        `/api/v1/users/${id}`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error('Update user error:', error);
      throw this.handleError(error as AxiosError);
    }
  }

  public async deleteUser(id: string): Promise<void> {
    try {
      await this.axiosInstance.delete(`/api/v1/users/${id}`);
    } catch (error) {
      console.error('Delete user error:', error);
      throw this.handleError(error as AxiosError);
    }
  }

  public async getUsersCount(): Promise<CountResponse> {
    try {
      const response = await this.axiosInstance.get<CountResponse>(
        '/api/v1/users/count'
      );
      return response.data;
    } catch (error) {
      console.error('Get users count error:', error);
      throw this.handleError(error as AxiosError);
    }
  }

  // Métodos de Clientes
  public async createClient(clientData: CreateClientRequest): Promise<Client> {
    try {
      const response = await this.axiosInstance.post<Client>(
        '/api/v1/clients',
        clientData
      );
      return response.data;
    } catch (error) {
      console.error('Create client error:', error);
      throw this.handleError(error as AxiosError);
    }
  }

  public async getClientById(id: string): Promise<Client> {
    try {
      const response = await this.axiosInstance.get<Client>(
        `/api/v1/clients/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Get client by ID error:', error);
      throw this.handleError(error as AxiosError);
    }
  }

  public async updateClient(
    id: string,
    clientData: UpdateClientRequest
  ): Promise<Client> {
    try {
      const response = await this.axiosInstance.put<Client>(
        `/api/v1/clients/${id}`,
        clientData
      );
      return response.data;
    } catch (error) {
      console.error('Update client error:', error);
      throw this.handleError(error as AxiosError);
    }
  }

  public async deleteClient(id: string): Promise<void> {
    try {
      await this.axiosInstance.delete(`/api/v1/clients/${id}`);
    } catch (error) {
      console.error('Delete client error:', error);
      throw this.handleError(error as AxiosError);
    }
  }

  public async getClients(
    limit = 10,
    offset = 0
  ): Promise<PaginatedResponse<Client>> {
    try {
      const response = await this.axiosInstance.get<PaginatedResponse<Client>>(
        `/api/v1/clients?limit=${limit}&offset=${offset}`
      );
      return response.data;
    } catch (error) {
      console.error('Get clients error:', error);
      throw this.handleError(error as AxiosError);
    }
  }

  public async getClientsCount(): Promise<CountResponse> {
    try {
      const response = await this.axiosInstance.get<CountResponse>(
        '/api/v1/clients/count'
      );
      return response.data;
    } catch (error) {
      console.error('Get clients count error:', error);
      throw this.handleError(error as AxiosError);
    }
  }

  // Métodos de Produtos
  public async createProduct(
    productData: CreateProductRequest
  ): Promise<Product> {
    try {
      const response = await this.axiosInstance.post<Product>(
        '/api/v1/products',
        productData
      );
      return response.data;
    } catch (error) {
      console.error('Create product error:', error);
      throw this.handleError(error as AxiosError);
    }
  }

  public async getProductById(id: string): Promise<Product> {
    try {
      const response = await this.axiosInstance.get<Product>(
        `/api/v1/products/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Get product by ID error:', error);
      throw this.handleError(error as AxiosError);
    }
  }

  public async updateProduct(
    id: string,
    productData: UpdateProductRequest
  ): Promise<Product> {
    try {
      const response = await this.axiosInstance.put<Product>(
        `/api/v1/products/${id}`,
        productData
      );
      return response.data;
    } catch (error) {
      console.error('Update product error:', error);
      throw this.handleError(error as AxiosError);
    }
  }

  public async deleteProduct(id: string): Promise<void> {
    try {
      await this.axiosInstance.delete(`/api/v1/products/${id}`);
    } catch (error) {
      console.error('Delete product error:', error);
      throw this.handleError(error as AxiosError);
    }
  }

  public async getProducts(
    limit = 10,
    offset = 0
  ): Promise<PaginatedResponse<Product>> {
    try {
      const response = await this.axiosInstance.get<PaginatedResponse<Product>>(
        `/api/v1/products?limit=${limit}&offset=${offset}`
      );
      return response.data;
    } catch (error) {
      console.error('Get products error:', error);
      throw this.handleError(error as AxiosError);
    }
  }

  public async getProductsCount(): Promise<CountResponse> {
    try {
      const response = await this.axiosInstance.get<CountResponse>(
        '/api/v1/products/count'
      );
      return response.data;
    } catch (error) {
      console.error('Get products count error:', error);
      throw this.handleError(error as AxiosError);
    }
  }

  // Health check
  public async healthCheck(): Promise<{ status: string; time: string }> {
    try {
      const response = await this.axiosInstance.get<{
        status: string;
        time: string;
      }>('/health');
      return response.data;
    } catch (error) {
      console.error('Health check error:', error);
      throw this.handleError(error as AxiosError);
    }
  }

  // Tratamento de erros
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

// Instância singleton do cliente API
export const apiClient = new ApiClient();

export default apiClient;
