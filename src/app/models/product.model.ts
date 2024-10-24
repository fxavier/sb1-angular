export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  category: string;
  imageUrl: string;
  images: string[];
  features: string[];
  specifications: Specification[];
  isNewArrival: boolean;
  isFeatured: boolean;
  stock: number;
  ratings: number;
}

export interface Specification {
  name: string;
  value: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  orders: Order[];
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: Date;
}

export interface Coupon {
  code: string;
  discount: number;
  validUntil: Date;
}