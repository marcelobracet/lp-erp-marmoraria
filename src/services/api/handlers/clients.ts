import { AxiosError } from 'axios';
import {
  Client,
  CreateClientRequest,
  UpdateClientRequest,
} from '../types/clients';
import { PaginatedResponse } from '../types/paginated';
import { CountResponse } from '../types/countResponse';
import { handleError } from './errors';
import { api } from '../axios';

export const clientsHandlers = {
  async createClient(clientData: CreateClientRequest): Promise<Client> {
    try {
      const response = await api.post<Client>('/api/v1/clients', clientData);
      return response.data;
    } catch (error) {
      console.error('Create client error:', error);
      throw handleError(error as AxiosError);
    }
  },

  async getClientById(id: string): Promise<Client> {
    try {
      const response = await api.get<Client>(`/api/v1/clients/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get client by ID error:', error);
      throw handleError(error as AxiosError);
    }
  },

  async updateClient(
    id: string,
    clientData: UpdateClientRequest
  ): Promise<Client> {
    try {
      const response = await api.put<Client>(
        `/api/v1/clients/${id}`,
        clientData
      );
      return response.data;
    } catch (error) {
      console.error('Update client error:', error);
      throw handleError(error as AxiosError);
    }
  },

  async deleteClient(id: string): Promise<void> {
    try {
      await api.delete(`/api/v1/clients/${id}`);
    } catch (error) {
      console.error('Delete client error:', error);
      throw handleError(error as AxiosError);
    }
  },

  async getClients(limit = 10, offset = 0): Promise<PaginatedResponse<Client>> {
    try {
      const response = await api.get<PaginatedResponse<Client>>(
        `/api/v1/clients?limit=${limit}&offset=${offset}`
      );
      return response.data;
    } catch (error) {
      console.error('Get clients error:', error);
      throw handleError(error as AxiosError);
    }
  },

  async getClientsCount(): Promise<CountResponse> {
    try {
      const response = await api.get<CountResponse>('/api/v1/clients/count');
      return response.data;
    } catch (error) {
      console.error('Get clients count error:', error);
      throw handleError(error as AxiosError);
    }
  },
};
