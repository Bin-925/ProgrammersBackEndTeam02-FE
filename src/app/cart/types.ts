export interface CartItemResponse {
  cartItemId: number;
  productId: number;
  productName: string;
  thumbnailImageUrl: string;
  productPrice: number;
  quantity: number;
  itemTotalPrice: number;
}

export interface CartResponse {
  cartId: string;
  items: CartItemResponse[];
  totalPrice: number;
}

// 화면 표시용 (API 응답 + 선택 상태 병합)
export interface CartDisplayItem {
  cartItemId: number;
  productId: number;
  name: string;
  price: number;
  thumbnailUrl: string;
  quantity: number;
  itemTotalPrice: number;
  selected: boolean;
}
