import { AxiosError } from 'axios';
import { handleError } from './errors';
import { CreateQuoteRequest, Quote, UpdateQuoteRequest } from '../types/quote';
import { api } from '../axios';
import { PaginatedResponse } from '../types/paginated';
import { CountResponse } from '../types/countResponse';

export const quotesHandlers = {
  async createQuote(quoteData: CreateQuoteRequest): Promise<Quote> {
    try {
      const response = await api.post<Quote>('/api/v1/quotes', quoteData);
      return response.data;
    } catch (error) {
      console.error('Create quote error:', error);
      throw handleError(error as AxiosError);
    }
  },

  async getQuoteById(id: string): Promise<Quote> {
    try {
      const response = await api.get<Quote>(`/api/v1/quotes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get quote by id error:', error);
      throw handleError(error as AxiosError);
    }
  },

  async updateQuote(id: string, quoteData: UpdateQuoteRequest): Promise<Quote> {
    try {
      const response = await api.put<Quote>(`/api/v1/quotes/${id}`, quoteData);
      return response.data;
    } catch (error) {
      console.error('Update quote error:', error);
      throw handleError(error as AxiosError);
    }
  },

  async deleteQuote(id: string): Promise<void> {
    try {
      await api.delete(`/api/v1/quotes/${id}`);
    } catch (error) {
      console.error('Delete quote error:', error);
      throw handleError(error as AxiosError);
    }
  },

  async getQuotes(limit = 10, offset = 0): Promise<PaginatedResponse<Quote>> {
    try {
      const response = await api.get<PaginatedResponse<Quote>>(
        '/api/v1/quotes',
        {
          params: { limit, offset },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Get quotes error:', error);
      throw handleError(error as AxiosError);
    }
  },

  async getQuotesCount(): Promise<CountResponse> {
    try {
      const response = await api.get<CountResponse>('/api/v1/quotes/count');
      return response.data;
    } catch (error) {
      console.error('Get quotes count error:', error);
      throw handleError(error as AxiosError);
    }
  },

  async updateQuoteStatus(
    id: string,
    status: 'Pendente' | 'Aprovado' | 'Rejeitado' | 'Cancelado'
  ): Promise<{ message: string }> {
    try {
      const response = await api.put<{ message: string }>(
        `/api/v1/quotes/${id}/status`,
        {
          status,
        }
      );
      return response.data;
    } catch (error) {
      console.error('Update quote status error:', error);
      throw handleError(error as AxiosError);
    }
  },
};
