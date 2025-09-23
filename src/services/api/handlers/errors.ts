import { AxiosError } from 'axios';
import { ApiError } from '../types/apiError';

export const handleError = (error: AxiosError): Error => {
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
};
