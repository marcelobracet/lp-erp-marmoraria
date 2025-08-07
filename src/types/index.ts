export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  avatar?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  documentType: "cpf" | "cnpj";
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface Product {
  id: string;
  name: string;
  type: "marble" | "granite" | "service";
  description: string;
  price: number;
  unit: "m²" | "unit";
  active: boolean;
}

export interface Quote {
  id: string;
  client: Client;
  items: {
    product: Product;
    quantity: number;
    price: number;
  }[];
  status: "draft" | "pending" | "approved" | "rejected";
  total: number;
  createdAt: Date;
  updatedAt: Date;
  validUntil: Date;
  notes?: string;
}

export interface DashboardMetrics {
  dailySales: number;
  openQuotes: number;
  cashBalance: number;
  monthlyRevenue: number;
}
