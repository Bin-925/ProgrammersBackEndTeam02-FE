export type OrderStatus = "처리중" | "배송중" | "배송완료" | "취소";

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  thumbnailUrl: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
  totalPrice: number;
}
