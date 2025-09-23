export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  document_type: 'CPF' | 'CNPJ';
  address: string;
  city: string;
  state: string;
  zip_code: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateClientRequest {
  name: string;
  email: string;
  phone: string;
  document: string;
  document_type: 'CPF' | 'CNPJ';
  address: string;
  city: string;
  state: string;
  zip_code: string;
}

export interface UpdateClientRequest {
  name?: string;
  email?: string;
  phone?: string;
  document?: string;
  document_type?: 'CPF' | 'CNPJ';
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
}
