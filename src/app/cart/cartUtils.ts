import type { CartItem } from "./types";

const CART_KEY = "cozy_cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cartUpdated"));
}

export function addToCart(
  product: { id: number; name: string; price: number; thumbnailUrl: string },
  quantity: number
): void {
  // TODO: 추후 POST /api/cart 로 교체 예정
  const cart = getCart();
  const existing = cart.find((item) => item.productId === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      cartId: String(product.id),
      productId: product.id,
      name: product.name,
      price: product.price,
      thumbnailUrl: product.thumbnailUrl,
      quantity,
      selected: true,
    });
  }
  saveCart(cart);
}
