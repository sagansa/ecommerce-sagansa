// FIX: Implemented missing type definitions.
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  category: string;
  slug?: string;
  stock?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  name: string;
  email: string;
}

export interface OrderItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
}
