import type { Order, OrderStatus, Product } from "./types";

const BASE_URL = "/api";

interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

interface AdminOrderResponse {
  orderId: number;
  customerEmail: string;
  address: string;
  zipCode: string;
  orderStatus: OrderStatus;
  totalPrice: number;
  createdAt: string;
}

export async function fetchOrders(): Promise<Order[]> {
  const res = await fetch(`${BASE_URL}/admin/orders?size=100`);
  if (!res.ok) throw new Error("주문 목록 조회 실패");
  const data: PageResponse<AdminOrderResponse> = await res.json();
  return data.content.map((o) => ({
    id: o.orderId,
    customerEmail: o.customerEmail,
    address: o.address,
    zipCode: o.zipCode,
    orderStatus: o.orderStatus,
    totalPrice: o.totalPrice,
    createdAt: o.createdAt,
  }));
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/admin/products`);
  if (!res.ok) throw new Error("상품 목록 조회 실패");
  return res.json();
}

export async function createProduct(product: Omit<Product, "id" | "detailPageImageUrl">): Promise<Product> {
  const res = await fetch(`${BASE_URL}/admin/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("상품 추가 실패");
  return res.json();
}

export async function updateProduct(id: number, product: Omit<Product, "id" | "detailPageImageUrl">): Promise<Product> {
  const res = await fetch(`${BASE_URL}/admin/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("상품 수정 실패");
  const text = await res.text();
  return text ? JSON.parse(text) : { id, detailPageImageUrl: "", ...product };
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/admin/products/${id}`, { method: "DELETE" });
  if (!res.ok) {
    if (res.status === 500) {
      throw new Error("이 상품을 담은 장바구니가 있어 삭제할 수 없습니다.\n백엔드에서 cascade delete 설정이 필요합니다.");
    }
    throw new Error("상품 삭제 실패");
  }
}

export async function updateOrderStatus(orderId: number, orderStatus: OrderStatus): Promise<void> {
  const res = await fetch(`${BASE_URL}/admin/${orderId}/status?status=${orderStatus}`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("주문 상태 변경 실패");
}
