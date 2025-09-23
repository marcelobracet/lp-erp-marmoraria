import { AxiosError } from 'axios';
import { api } from '../axios';
import { handleError } from './errors';

export const healthHandlers = {
  async healthCheck(): Promise<{ status: string; time: string }> {
    try {
      const response = await api.get<{
        status: string;
        time: string;
      }>('/health');
      return response.data;
    } catch (error) {
      console.error('Health check error:', error);
      throw handleError(error as AxiosError);
    }
  },
};
