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

export default function OrdersTab({
  filteredOrders,
  filterStatus,
  openDropdownId,
  onFilterStatusChange,
  onOrderStatusChange,
  onDropdownToggle,
}: OrdersTabProps) {
  return (
    <>
      <div style={styles.pageHeader}>
        <div style={styles.pageTitle}>주문 관리</div>
        <div style={styles.pageSubtitle}>전체 {filteredOrders.length}건의 주문</div>
      </div>

      <div style={styles.card}>
        <div style={styles.filterRow}>
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
              {["주문 ID", "이메일", "주소", "우편번호", "총 금액", "주문 일시", "상태", "작업"].map(h => (
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
                  <div style={styles.dropdownWrapper}>
                    <span
                      style={{ ...styles.statusBadge(order.orderStatus), cursor: "pointer", userSelect: "none" }}
                      onClick={() => onDropdownToggle(openDropdownId === order.id ? null : order.id)}
                    >
                      {ORDER_STATUS_LABEL[order.orderStatus]} ▾
                    </span>
                    {openDropdownId === order.id && (
                      <div style={styles.dropdown}>
                        {ORDER_STATUSES.map(s => (
                          <div
                            key={s}
                            style={styles.dropdownItem}
                            onMouseEnter={e => (e.currentTarget.style.background = "#f5f0eb")}
                            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                            onClick={() => onOrderStatusChange(order.id, s)}
                          >
                            {ORDER_STATUS_LABEL[s]}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td style={styles.td}>
                  {/* 주문 삭제 API 엔드포인트 추가 시 활성화 */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
