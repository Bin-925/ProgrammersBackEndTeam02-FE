export interface Product {
  id: number;
  name: string;
  price: number;
  weight: string;
  roasting: "라이트" | "미디엄" | "다크";
  isDecaf: boolean;
  acidity: boolean;
  tags: string[];
  shortDescription: string;
  thumbnailUrl: string;
  stock: number;
}
