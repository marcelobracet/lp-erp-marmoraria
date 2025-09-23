export interface QuoteItem {
  id?: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface Quote {
  id: string;
  client_id: string;
  client?: {
    id: string;
    name: string;
  };
  client_name?: string;
  total_value: number;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  items: QuoteItem[];
  date: string;
  valid_until: string;
  notes: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateQuoteRequest {
  client_id: string;
  date: string;
  valid_until: string;
  notes: string;
  items: Array<{
    product_id: string;
    quantity: number;
  }>;
}

export interface UpdateQuoteRequest {
  client_id?: string;
  date?: string;
  valid_until?: string;
  notes: string;
  items?: Array<{
    product_id: string;
    quantity: number;
  }>;
}
