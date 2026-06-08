"use client";

import { useRef, useState, useEffect } from "react";
import { ORDER_STATUSES, ORDER_STATUS_LABEL } from "../constants";
import { styles } from "../styles";
import type { Order, OrderStatus } from "../types";

interface OrdersTabProps {
  filteredOrders: Order[];
  filterStatus: string;
  openDropdownId: number | null;
  onFilterStatusChange: (status: string) => void;
  onOrderStatusChange: (orderId: number, newStatus: OrderStatus) => void;
  onDropdownToggle: (orderId: number | null) => void;
}

interface DropdownPos {
  top: number;
  left: number;
}

export default function OrdersTab({
  filteredOrders,
  filterStatus,
  openDropdownId,
  onFilterStatusChange,
  onOrderStatusChange,
  onDropdownToggle,
}: OrdersTabProps) {
  const [dropdownPos, setDropdownPos] = useState<DropdownPos | null>(null);

  const handleBadgeClick = (e: React.MouseEvent, orderId: number) => {
    if (openDropdownId === orderId) {
      onDropdownToggle(null);
      return;
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDropdownPos({ top: rect.bottom + 4, left: rect.left });
    onDropdownToggle(orderId);
  };

  // 외부 클릭 시 닫기
  useEffect(() => {
    if (openDropdownId === null) return;
    const close = () => onDropdownToggle(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [openDropdownId, onDropdownToggle]);

  return (
    <>
      <div style={styles.pageHeader}>
        <div style={styles.pageTitle}>주문 관리</div>
        <div style={styles.pageSubtitle}>전체 {filteredOrders.length}건의 주문</div>
      </div>

      <div style={styles.card}>
        <div style={{ ...styles.filterRow, borderRadius: "12px 12px 0 0" }}>
          <span style={styles.filterLabel}>상태 필터:</span>
          <select style={styles.select} value={filterStatus} onChange={e => onFilterStatusChange(e.target.value)}>
            <option value="전체">전체</option>
            {ORDER_STATUSES.map(s => (
              <option key={s} value={s}>{ORDER_STATUS_LABEL[s]}</option>
            ))}
          </select>
          <span style={styles.filterCount}>{filteredOrders.length}건 검색됨</span>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              {["주문 ID", "이메일", "주소", "우편번호", "총 금액", "주문 일시", "상태"].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td style={{ ...styles.td, color: "#5a4a3a", fontWeight: 500 }}>#{order.id}</td>
                <td style={styles.td}>{order.customerEmail}</td>
                <td style={styles.td}>{order.address}</td>
                <td style={styles.td}>{order.zipCode}</td>
                <td style={{ ...styles.td, fontWeight: 600 }}>₩{order.totalPrice.toLocaleString()}</td>
                <td style={{ ...styles.td, color: "#8a7a6a" }}>{order.createdAt.replace("T", " ").slice(0, 16)}</td>
                <td style={styles.td}>
                  <span
                    style={{ ...styles.statusBadge(order.orderStatus), cursor: "pointer", userSelect: "none" }}
                    onClick={e => { e.stopPropagation(); handleBadgeClick(e, order.id); }}
                  >
                    {ORDER_STATUS_LABEL[order.orderStatus]} ▾
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 드롭다운: position fixed로 overflow 완전히 탈출 */}
      {openDropdownId !== null && dropdownPos && (
        <div
          style={{
            ...styles.dropdown,
            position: "fixed",
            top: dropdownPos.top,
            left: dropdownPos.left,
            zIndex: 9999,
          }}
          onClick={e => e.stopPropagation()}
        >
          {ORDER_STATUSES.map(s => (
            <div
              key={s}
              style={styles.dropdownItem}
              onMouseEnter={e => (e.currentTarget.style.background = "#f5f0eb")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              onClick={() => { onOrderStatusChange(openDropdownId, s); onDropdownToggle(null); }}
            >
              {ORDER_STATUS_LABEL[s]}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
