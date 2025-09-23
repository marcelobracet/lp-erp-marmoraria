export interface Settings {
  id: string;
  trade_name: string;
  legal_name: string;
  cnpj: string;
  phone: string;
  email: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
  primary_color: string;
  secondary_color: string;
  logo_url: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateSettingsRequest {
  trade_name?: string;
  legal_name?: string;
  cnpj?: string;
  phone?: string;
  email?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  primary_color?: string;
  secondary_color?: string;
  logo_url?: string;
}
