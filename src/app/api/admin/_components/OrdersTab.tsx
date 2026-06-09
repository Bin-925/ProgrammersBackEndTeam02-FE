"use client";

import { useRef, useState, useEffect } from "react";
import { ORDER_STATUSES, ORDER_STATUS_LABEL } from "../constants";
import { styles } from "../styles";
import type { GroupedOrder, OrderStatus } from "../types";

interface OrdersTabProps {
  filteredGroups: GroupedOrder[];
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
  filteredGroups,
  filterStatus,
  openDropdownId,
  onFilterStatusChange,
  onOrderStatusChange,
  onDropdownToggle,
}: OrdersTabProps) {
  const [dropdownPos, setDropdownPos] = useState<DropdownPos | null>(null);

  const totalOrderCount = filteredGroups.reduce((sum, g) => sum + g.orders.length, 0);

  const handleBadgeClick = (e: React.MouseEvent, orderId: number) => {
    if (openDropdownId === orderId) {
      onDropdownToggle(null);
      return;
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDropdownPos({ top: rect.bottom + 4, left: rect.left });
    onDropdownToggle(orderId);
  };

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
        <div style={styles.pageSubtitle}>
          {filteredGroups.length}개 묶음 · 총 {totalOrderCount}건의 주문
        </div>
      </div>

      <div style={styles.card}>
        {/* 필터 */}
        <div style={{ ...styles.filterRow, borderRadius: "12px 12px 0 0" }}>
          <span style={styles.filterLabel}>상태 필터:</span>
          <select style={styles.select} value={filterStatus} onChange={e => onFilterStatusChange(e.target.value)}>
            <option value="전체">전체</option>
            {ORDER_STATUSES.map(s => (
              <option key={s} value={s}>{ORDER_STATUS_LABEL[s]}</option>
            ))}
          </select>
          <span style={styles.filterCount}>{filteredGroups.length}개 묶음 검색됨</span>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              {["구분", "이메일", "주소", "우편번호", "배송예정일 / 주문일시", "금액", "상태"].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredGroups.map((group, gi) => (
              <>
                {/* 그룹 헤더 행 */}
                <tr key={`group-${gi}`}>
                  <td
                    style={{
                      ...styles.td,
                      background: "#f0e8df",
                      fontWeight: 700,
                      color: "#1e3a1e",
                      fontSize: 12,
                      whiteSpace: "nowrap",
                    }}
                  >
                    📦 {group.orderCount}건 묶음
                  </td>
                  <td style={{ ...styles.td, background: "#f0e8df", fontSize: 13, color: "#2c1a0e" }}>
                    {group.customerEmail}
                  </td>
                  <td style={{ ...styles.td, background: "#f0e8df", fontSize: 13, color: "#2c1a0e" }}>
                    {group.address}
                  </td>
                  <td style={{ ...styles.td, background: "#f0e8df", fontSize: 13, color: "#2c1a0e" }}>
                    {group.zipCode}
                  </td>
                  <td style={{ ...styles.td, background: "#f0e8df", fontSize: 13, color: "#5a4a3a", fontWeight: 600 }}>
                    🚚 {group.deliveryDate}
                  </td>
                  <td style={{ ...styles.td, background: "#f0e8df", fontWeight: 700, color: "#1e3a1e" }}>
                    ₩{group.totalGroupPrice.toLocaleString()}
                  </td>
                  <td style={{ ...styles.td, background: "#f0e8df" }} />
                </tr>

                {/* 개별 주문 행 */}
                {group.orders.map(order => (
                  <tr key={`order-${order.orderId}`}>
                    <td style={{ ...styles.td, color: "#8a7a6a", fontSize: 12, paddingLeft: 28 }}>
                      └ #{order.orderId}
                    </td>
                    <td style={{ ...styles.td, color: "#a89888", fontSize: 12 }} />
                    <td style={{ ...styles.td, color: "#a89888", fontSize: 12 }} />
                    <td style={{ ...styles.td, color: "#a89888", fontSize: 12 }} />
                    <td style={{ ...styles.td, color: "#8a7a6a", fontSize: 12 }}>
                      {order.createdAt.replace("T", " ").slice(0, 16)}
                    </td>
                    <td style={{ ...styles.td, fontSize: 13, fontWeight: 600, color: "#3a2a1a" }}>
                      ₩{order.totalPrice.toLocaleString()}
                    </td>
                    <td style={styles.td}>
                      <span
                        style={{ ...styles.statusBadge(order.orderStatus), cursor: "pointer", userSelect: "none" }}
                        onClick={e => { e.stopPropagation(); handleBadgeClick(e, order.orderId); }}
                      >
                        {ORDER_STATUS_LABEL[order.orderStatus]} ▾
                      </span>
                    </td>
                  </tr>
                ))}

                {/* 그룹 구분선 */}
                <tr key={`sep-${gi}`}>
                  <td colSpan={7} style={{ padding: 0, borderBottom: "2px solid #e8ddd4" }} />
                </tr>
              </>
            ))}
          </tbody>
        </table>

        {filteredGroups.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 0", color: "#8a7a6a", fontSize: 14 }}>
            해당 조건의 주문이 없습니다
          </div>
        )}
      </div>

      {/* 상태 변경 드롭다운 */}
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
