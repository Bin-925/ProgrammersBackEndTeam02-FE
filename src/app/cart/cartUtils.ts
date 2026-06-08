import type { CartDisplayItem, CartResponse } from "./types";

const SELECTED_KEY = "cozy_cart_selected";

// ── 선택 상태 (localStorage) ───────────────────────────

export function getSelectedIds(): number[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(SELECTED_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveSelectedIds(ids: number[]): void {
  localStorage.setItem(SELECTED_KEY, JSON.stringify(ids));
}

// ── API 호출 ──────────────────────────────────────────

export async function fetchCart(): Promise<CartDisplayItem[]> {
  const res = await fetch("/api/cart");
  if (!res.ok) throw new Error("장바구니 조회 실패");
  const data: CartResponse = await res.json();
  const selectedIds = getSelectedIds();
  return data.items.map((item) => ({
    cartItemId: item.cartItemId,
    productId: item.productId,
    name: item.productName,
    price: item.productPrice,
    thumbnailUrl: item.thumbnailImageUrl,
    quantity: item.quantity,
    itemTotalPrice: item.itemTotalPrice,
    selected: selectedIds.length === 0 || selectedIds.includes(item.cartItemId),
  }));
}

export async function addToCart(productId: number, quantity: number): Promise<void> {
  const res = await fetch("/api/cart/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!res.ok) throw new Error("장바구니 추가 실패");
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cartUpdated"));
  }
}

export async function removeCartItem(cartItemId: number): Promise<void> {
  const res = await fetch(`/cart/items/${cartItemId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("장바구니 항목 삭제 실패");
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cartUpdated"));
  }
}

export async function updateCartItemQty(cartItemId: number, quantity: number): Promise<void> {
  const res = await fetch(`/cart/items/${cartItemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error("수량 변경 실패");
}

export async function getCartCount(): Promise<number> {
  try {
    const res = await fetch("/api/cart");
    if (!res.ok) return 0;
    const data: CartResponse = await res.json();
    return data.items.reduce((sum, item) => sum + item.quantity, 0);
  } catch {
    return 0;
  }
}
