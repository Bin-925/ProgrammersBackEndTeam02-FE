import type { Product } from "../app/customer/types";

export interface ApiProduct {
  id: number;
  productName: string;
  isDecaf: boolean;
  acidity: boolean;
  roastingLevel: "LIGHT" | "MEDIUM" | "DARK";
  productPrice: number;
  stock: number;
  description: string;
  thumbnailImageUrl: string;
  detailPageImageUrl: string;
}

const roastingMap: Record<ApiProduct["roastingLevel"], Product["roasting"]> = {
  LIGHT: "라이트",
  MEDIUM: "미디엄",
  DARK: "다크",
};

export function mapApiProductToCustomer(p: ApiProduct): Product {
  const tags: string[] = [roastingMap[p.roastingLevel]];
  if (p.isDecaf) tags.push("디카페인");
  if (p.acidity) tags.push("산미");

  return {
    id: p.id,
    name: p.productName,
    price: p.productPrice,
    weight: "250g",
    roasting: roastingMap[p.roastingLevel],
    isDecaf: p.isDecaf,
    acidity: p.acidity,
    tags,
    shortDescription: p.description,
    thumbnailUrl: p.thumbnailImageUrl,
    stock: p.stock,
  };
}
