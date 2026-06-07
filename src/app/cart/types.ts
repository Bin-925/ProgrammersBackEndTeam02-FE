export interface CartItem {
  cartId: string;
  productId: number;
  name: string;
  price: number;
  thumbnailUrl: string;
  quantity: number;
  selected: boolean;
}
