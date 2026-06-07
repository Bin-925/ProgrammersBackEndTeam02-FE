import type { Order, OrderStatus, Product } from "./types";

const BASE_URL = "/api";

export async function fetchOrders(): Promise<Order[]> {
  const res = await fetch(`${BASE_URL}/admin/orders`);
  if (!res.ok) throw new Error("주문 목록 조회 실패");
  return res.json();
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
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("상품 수정 실패");
  return res.json();
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/admin/products/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("상품 삭제 실패");
}

export async function updateOrderStatus(orderId: number, orderStatus: OrderStatus): Promise<void> {
  const res = await fetch(`${BASE_URL}/admin/${orderId}/status?status=${orderStatus}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("주문 상태 변경 실패");
}
