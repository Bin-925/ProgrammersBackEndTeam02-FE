import { ORDER_STATUS_LABEL } from "../constants";
import { styles } from "../styles";
import type { Order } from "../types";

interface DashboardTabProps {
  todayOrders: Order[];
  pendingCount: number;
  todayRevenue: number;
  onViewAllOrders: () => void;
}

export default function DashboardTab({ todayOrders, pendingCount, todayRevenue, onViewAllOrders }: DashboardTabProps) {
  const today = new Date().toISOString().split("T")[0];

  const stats = [
    { label: "오늘의 주문", value: `${todayOrders.length}건` },
    { label: "오늘 매출",   value: `₩${todayRevenue.toLocaleString()}` },
    { label: "처리 중",     value: `${pendingCount}건` },
  ];

  return (
    <>
      <div style={{ ...styles.topRow, alignItems: "flex-start" }}>
        <div style={styles.pageHeader}>
          <div style={styles.pageTitle}>대시보드</div>
          <div style={styles.pageSubtitle}>{today} · 오늘의 현황</div>
        </div>
        <button style={{ ...styles.btn, ...styles.btnPrimary }} onClick={onViewAllOrders}>
          전체 주문 보기 →
        </button>
      </div>

      <div style={{ ...styles.statGrid, gridTemplateColumns: "repeat(3, 1fr)" }}>
        {stats.map((stat, i) => (
          <div key={i} style={styles.statCard}>
            <div style={styles.statLabel}>{stat.label}</div>
            <div style={styles.statValue}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div style={styles.cardTitle}>오늘의 주문</div>
          <div style={styles.cardBadge}>{todayOrders.length}건</div>
        </div>
        <table style={styles.table}>
          <thead>
            <tr>
              {["주문 번호", "이메일", "주소", "총 금액", "주문 시각", "상태"].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {todayOrders.map(order => (
              <tr key={order.id}>
                <td style={{ ...styles.td, color: "#5a4a3a", fontWeight: 500 }}>#{order.id}</td>
                <td style={styles.td}>{order.customerEmail}</td>
                <td style={styles.td}>{order.address}</td>
                <td style={{ ...styles.td, fontWeight: 600 }}>₩{order.totalPrice.toLocaleString()}</td>
                <td style={{ ...styles.td, color: "#8a7a6a" }}>{order.createdAt.split("T")[1]?.slice(0, 5)}</td>
                <td style={styles.td}>
                  <span style={styles.statusBadge(order.orderStatus)}>
                    {ORDER_STATUS_LABEL[order.orderStatus]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
