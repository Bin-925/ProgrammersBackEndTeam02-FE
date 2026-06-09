export type OrderStatus   = "PENDING" | "PROCESSING" | "SHIPPING" | "DELIVERED" | "CANCELLED";
export type RoastingLevel = "LIGHT" | "MEDIUM" | "DARK";

export interface Order {
  id: number;
  customerEmail: string;
  address: string;
  zipCode: string;
  orderStatus: OrderStatus;
  totalPrice: number;
  createdAt: string;
  updatedAt?: string;
}

export interface OrderInGroup {
  orderId: number;
  totalPrice: number;
  createdAt: string;
  orderStatus: OrderStatus;
}

export interface GroupedOrder {
  deliveryDate: string;
  customerEmail: string;
  address: string;
  zipCode: string;
  orderCount: number;
  totalGroupPrice: number;
  orders: OrderInGroup[];
}

export interface Product {
  id: number;
  productName: string;
  decaf: boolean;
  roastingLevel: RoastingLevel;
  acidity: boolean;
  productPrice: number;
  stock: number;
  description: string;
  thumbnailImageUrl: string;
  detailPageImageUrl: string;
}

export interface ProductForm {
  productName: string;
  decaf: boolean;
  roastingLevel: RoastingLevel;
  acidity: boolean;
  productPrice: string;
  stock: string;
  description: string;
  thumbnailImageUrl: string;
  detailPageImageUrl: string;
}
