import { AxiosError } from 'axios';
import { Settings } from 'http2';
import { UpdateSettingsRequest } from '../types/settings';
import { handleError } from './errors';
import { api } from '../axios';

export const settingsHandlers = {
  async getSettings(): Promise<Settings> {
    try {
      const response = await api.get<Settings>('/api/v1/settings');
      return response.data;
    } catch (error) {
      console.error('Get settings error:', error);
      throw handleError(error as AxiosError);
    }
  },

  async updateSettings(settingsData: UpdateSettingsRequest): Promise<Settings> {
    try {
      const response = await api.put<Settings>(
        '/api/v1/settings',
        settingsData
      );
      return response.data;
    } catch (error) {
      console.error('Update settings error:', error);
      throw handleError(error as AxiosError);
    }
  },
};
