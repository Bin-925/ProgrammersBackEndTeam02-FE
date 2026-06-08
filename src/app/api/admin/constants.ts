import type { OrderStatus, RoastingLevel } from "./types";

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  PROCESSING: "처리 중",
  SHIPPING:   "배송 중",
  DELIVERED:  "배송 완료",
  CANCELLED:  "취소",
};

export const ROASTING_LEVEL_LABEL: Record<RoastingLevel, string> = {
  LIGHT:  "라이트",
  MEDIUM: "미디엄",
  DARK:   "다크",
};

export const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  PROCESSING: { bg: "#e3f2fd", color: "#1565c0" },
  SHIPPING:   { bg: "#fff3e0", color: "#e65100" },
  DELIVERED:  { bg: "#e8f5e9", color: "#2e7d32" },
  CANCELLED:  { bg: "#fce4ec", color: "#c62828" },
};

export const ROAST_COLORS: Record<RoastingLevel, string> = {
  LIGHT:  "#66bb6a",
  MEDIUM: "#ffa726",
  DARK:   "#ef5350",
};

export const NAV_ITEMS = [
  { id: "dashboard", label: "대시보드", icon: "📊" },
  { id: "orders",    label: "주문 관리", icon: "📋" },
  { id: "menu",      label: "메뉴 관리", icon: "☕" },
] as const;

export const ORDER_STATUSES: OrderStatus[]     = ["PROCESSING", "SHIPPING", "DELIVERED", "CANCELLED"];
export const ROASTING_LEVELS: RoastingLevel[]  = ["LIGHT", "MEDIUM", "DARK"];
