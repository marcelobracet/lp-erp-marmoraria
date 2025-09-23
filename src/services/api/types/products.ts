export interface Product {
  id: string;
  name: string;
  description: string;
  type: 'Mármore' | 'Granito' | 'Serviço';
  price: number;
  unit: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  type: 'Mármore' | 'Granito' | 'Serviço';
  price: number;
  unit: string;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  type?: 'Mármore' | 'Granito' | 'Serviço';
  price?: number;
  unit?: string;
}
