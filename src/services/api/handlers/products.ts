import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '@/constants/api';
import {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
} from '../types/products';
import { CountResponse } from '../types/countResponse';
import { PaginatedResponse } from '../types/paginated';
import { handleError } from './errors';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

export const productsHandlers = {
  async createProduct(productData: CreateProductRequest): Promise<Product> {
    try {
      const response = await axiosInstance.post<Product>(
        '/api/v1/products',
        productData
      );
      return response.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  },

  async getProductById(id: string): Promise<Product> {
    try {
      const response = await axiosInstance.get<Product>(
        `/api/v1/products/${id}`
      );
      return response.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  },

  async updateProduct(
    id: string,
    productData: UpdateProductRequest
  ): Promise<Product> {
    try {
      const response = await axiosInstance.put<Product>(
        `/api/v1/products/${id}`,
        productData
      );
      return response.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  },

  async deleteProduct(id: string): Promise<void> {
    try {
      await axiosInstance.delete(`/api/v1/products/${id}`);
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  },

  async getProducts(
    limit = 10,
    offset = 0
  ): Promise<PaginatedResponse<Product>> {
    try {
      const response = await axiosInstance.get<PaginatedResponse<Product>>(
        `/api/v1/products?limit=${limit}&offset=${offset}`
      );
      return response.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  },

  async getProductsCount(): Promise<CountResponse> {
    try {
      const response = await axiosInstance.get<CountResponse>(
        '/api/v1/products/count'
      );
      return response.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  },
};
