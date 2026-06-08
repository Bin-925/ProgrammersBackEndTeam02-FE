"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { styles } from "../styles";
import type { Order } from "../types";

interface DashboardTabProps {
  todayOrders: Order[];
  pendingCount: number;
  todayRevenue: number;
  onViewAllOrders: () => void;
}

function buildHourlyData(orders: Order[]) {
  const currentHour = new Date().getHours();
  const buckets = Array.from({ length: currentHour + 1 }, (_, h) => ({
    hour: `${h}시`,
    주문수: 0,
    매출: 0,
  }));
  for (const order of orders) {
    const h = new Date(order.createdAt).getHours();
    if (h <= currentHour) {
      buckets[h].주문수 += 1;
      buckets[h].매출  += order.totalPrice;
    }
  }
  return buckets;
}

export default function DashboardTab({ todayOrders, pendingCount, todayRevenue, onViewAllOrders }: DashboardTabProps) {
  const today = new Date().toISOString().split("T")[0];
  const hourlyData = buildHourlyData(todayOrders);

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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>오늘의 주문</div>
            <div style={styles.cardBadge}>{todayOrders.length}건</div>
          </div>
          <div style={{ padding: "20px 8px 16px" }}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={hourlyData} margin={{ top: 4, right: 16, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe4" />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "#8a7a6a" }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#8a7a6a" }} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e8e0d8" }}
                  formatter={(v) => [`${Number(v ?? 0)}건`, "주문 수"]}
                />
                <Bar dataKey="주문수" fill="#2d5a1b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>오늘 매출</div>
            <div style={styles.cardBadge}>₩{todayRevenue.toLocaleString()}</div>
          </div>
          <div style={{ padding: "20px 8px 16px" }}>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={hourlyData} margin={{ top: 4, right: 16, left: 4, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe4" />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "#8a7a6a" }} />
                <YAxis tick={{ fontSize: 11, fill: "#8a7a6a" }} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e8e0d8" }}
                  formatter={(v) => [`₩${Number(v ?? 0).toLocaleString()}`, "매출"]}
                />
                <Line dataKey="매출" stroke="#5a8a3a" strokeWidth={2} dot={{ r: 4, fill: "#5a8a3a" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
