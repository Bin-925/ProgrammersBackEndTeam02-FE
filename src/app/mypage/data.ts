// TODO: 추후 GET /api/orders?email={email} 로 교체 예정
import type { Order } from "./types";

export const dummyOrders: Order[] = [
  {
    id: "ord-001",
    orderNumber: "ORD-20260601-001",
    createdAt: "2026-06-01T10:30:00",
    status: "배송완료",
    items: [
      {
        productId: 1,
        name: "콜롬비아 나리뇨",
        price: 20000,
        quantity: 2,
        thumbnailUrl: "/images/colombia-narino-thumb.png",
      },
      {
        productId: 4,
        name: "에티오피아 시다모",
        price: 21000,
        quantity: 1,
        thumbnailUrl: "/images/ethiopia-thumb.png",
      },
    ],
    totalPrice: 61000,
  },
  {
    id: "ord-002",
    orderNumber: "ORD-20260605-002",
    createdAt: "2026-06-05T14:15:00",
    status: "배송중",
    items: [
      {
        productId: 3,
        name: "콜롬비아 킨디오",
        price: 23000,
        quantity: 1,
        thumbnailUrl: "/images/colombia-quindio-thumb.png",
      },
    ],
    totalPrice: 23000,
  },
  {
    id: "ord-003",
    orderNumber: "ORD-20260607-003",
    createdAt: "2026-06-07T09:00:00",
    status: "처리중",
    items: [
      {
        productId: 2,
        name: "브라질 세라 두 카파라오",
        price: 22000,
        quantity: 1,
        thumbnailUrl: "/images/brazil-thumb.png",
      },
      {
        productId: 1,
        name: "콜롬비아 나리뇨",
        price: 20000,
        quantity: 1,
        thumbnailUrl: "/images/colombia-narino-thumb.png",
      },
    ],
    totalPrice: 42000,
  },
];
