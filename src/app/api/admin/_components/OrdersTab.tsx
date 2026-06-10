"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
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
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set());

  const totalOrderCount = filteredGroups.reduce((sum, g) => sum + g.orders.length, 0);

  const toggleGroup = (gi: number) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(gi)) next.delete(gi);
      else next.add(gi);
      return next;
    });
  };

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
        <div style={styles.pageSubtitle}>총 {totalOrderCount}건의 주문</div>
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
          <span style={styles.filterCount}>{totalOrderCount}건 검색됨</span>
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
            {filteredGroups.map((group, gi) => {
              const isSingle = group.orders.length === 1;
              const isExpanded = expandedGroups.has(gi);
              const order = group.orders[0];

              if (isSingle) {
                return (
                  <>
                    <tr key={`single-${gi}`}>
                      <td style={{ ...styles.td, fontSize: 13, color: "#5a4a3a" }}>
                        #{order.orderId}
                      </td>
                      <td style={{ ...styles.td, fontSize: 13, color: "#2c1a0e" }}>
                        {group.customerEmail}
                      </td>
                      <td style={{ ...styles.td, fontSize: 13, color: "#2c1a0e" }}>
                        {group.address}
                      </td>
                      <td style={{ ...styles.td, fontSize: 13, color: "#2c1a0e" }}>
                        {group.zipCode}
                      </td>
                      <td style={{ ...styles.td, fontSize: 12, color: "#5a4a3a" }}>
                        <div style={{ fontWeight: 600, color: "#3a2a1a" }}>🚚 {group.deliveryDate}</div>
                        <div style={{ color: "#8a7a6a", marginTop: 2 }}>{order.createdAt.replace("T", " ").slice(0, 16)}</div>
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
                    <tr key={`sep-single-${gi}`}>
                      <td colSpan={7} style={{ padding: 0, borderBottom: "1px solid #e8ddd4" }} />
                    </tr>
                  </>
                );
              }

              return (
                <>
                  {/* 묶음 그룹 헤더 */}
                  {(() => {
                    const activeTotal = group.orders
                      .filter(o => o.orderStatus !== "CANCELLED")
                      .reduce((sum, o) => sum + o.totalPrice, 0);
                    const hasCancelled = group.orders.some(o => o.orderStatus === "CANCELLED");
                    const statusCounts = group.orders.reduce((acc, o) => {
                      acc[o.orderStatus] = (acc[o.orderStatus] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>);

                    return (
                      <tr
                        key={`group-${gi}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => toggleGroup(gi)}
                      >
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
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                            {isExpanded
                              ? <ChevronDown size={13} style={{ color: "#5a4a3a" }} />
                              : <ChevronRight size={13} style={{ color: "#5a4a3a" }} />
                            }
                            {group.orderCount}건 묶음
                          </span>
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
                          ₩{activeTotal.toLocaleString()}
                          {hasCancelled && (
                            <span style={{ display: "block", fontSize: 10, fontWeight: 400, color: "#a89888", marginTop: 1 }}>
                              취소 포함
                            </span>
                          )}
                        </td>
                        <td style={{ ...styles.td, background: "#f0e8df" }}>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                            {(Object.entries(statusCounts) as [OrderStatus, number][]).map(([s, cnt]) => (
                              <span key={s} style={{ ...styles.statusBadge(s), fontSize: 10, padding: "1px 6px" }}>
                                {ORDER_STATUS_LABEL[s]}{cnt > 1 ? ` ${cnt}` : ""}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })()}

                  {/* 개별 주문 행 (펼쳐졌을 때만) */}
                  {isExpanded && group.orders.map(ord => (
                    <tr key={`order-${ord.orderId}`}>
                      <td style={{ ...styles.td, color: "#8a7a6a", fontSize: 12, paddingLeft: 28 }}>
                        └ #{ord.orderId}
                      </td>
                      <td style={{ ...styles.td, color: "#a89888", fontSize: 12 }} />
                      <td style={{ ...styles.td, color: "#a89888", fontSize: 12 }} />
                      <td style={{ ...styles.td, color: "#a89888", fontSize: 12 }} />
                      <td style={{ ...styles.td, color: "#8a7a6a", fontSize: 12 }}>
                        {ord.createdAt.replace("T", " ").slice(0, 16)}
                      </td>
                      <td style={{ ...styles.td, fontSize: 13, fontWeight: 600, color: "#3a2a1a" }}>
                        ₩{ord.totalPrice.toLocaleString()}
                      </td>
                      <td style={styles.td}>
                        <span
                          style={{ ...styles.statusBadge(ord.orderStatus), cursor: "pointer", userSelect: "none" }}
                          onClick={e => { e.stopPropagation(); handleBadgeClick(e, ord.orderId); }}
                        >
                          {ORDER_STATUS_LABEL[ord.orderStatus]} ▾
                        </span>
                      </td>
                    </tr>
                  ))}

                  {/* 그룹 구분선 */}
                  <tr key={`sep-${gi}`}>
                    <td colSpan={7} style={{ padding: 0, borderBottom: "2px solid #e8ddd4" }} />
                  </tr>
                </>
              );
            })}
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
