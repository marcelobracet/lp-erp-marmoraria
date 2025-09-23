export interface PaginatedResponse<T> {
  data?: T[];
  clients?: T[];
  products?: T[];
  quotes?: T[];
  total: number;
  limit: number;
  offset: number;
}
