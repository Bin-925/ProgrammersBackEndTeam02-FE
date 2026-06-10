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
import { ArrowRight } from "lucide-react";
import { STATUS_COLORS, ORDER_STATUS_LABEL } from "../constants";
import { styles } from "../styles";
import type { Order, OrderStatus } from "../types";

interface DashboardTabProps {
  todayOrders: Order[];
  todayRevenue: number;
  onViewAllOrders: () => void;
}

function parseUTC(createdAt: string) {
  const utcStr = createdAt.endsWith("Z") ? createdAt : createdAt + "Z";
  return new Date(utcStr);
}

function buildHourlyData(orders: Order[]) {
  const currentHour = new Date().getHours();
  const buckets = Array.from({ length: currentHour + 1 }, (_, h) => ({
    hour: `${h}시`,
    주문수: 0,
    매출: 0,
  }));
  for (const order of orders) {
    const h = parseUTC(order.createdAt).getHours();
    if (h <= currentHour) {
      buckets[h].주문수 += 1;
      if (order.orderStatus !== "CANCELLED") buckets[h].매출 += order.totalPrice;
    }
  }
  return buckets;
}

const STATUS_ORDER: OrderStatus[] = ["PENDING", "PROCESSING", "SHIPPING", "DELIVERED", "CANCELLED"];

export default function DashboardTab({ todayOrders, todayRevenue, onViewAllOrders }: DashboardTabProps) {
  const today = new Date().toLocaleDateString("sv");
  const hourlyData = buildHourlyData(todayOrders);

  const statusCounts = STATUS_ORDER.map((status) => ({
    status,
    label: ORDER_STATUS_LABEL[status],
    count: todayOrders.filter((o) => o.orderStatus === status).length,
    colors: STATUS_COLORS[status],
  }));

  const topStats = [
    { label: "오늘 총 주문", value: `${todayOrders.length}건` },
    { label: "오늘 매출 (취소 제외)", value: `₩${todayRevenue.toLocaleString()}` },
  ];

  return (
    <>
      <div style={{ ...styles.topRow, alignItems: "flex-start" }}>
        <div style={styles.pageHeader}>
          <div style={styles.pageTitle}>대시보드</div>
          <div style={styles.pageSubtitle}>{today} · 오늘의 현황</div>
        </div>
        <button style={{ ...styles.btn, ...styles.btnPrimary }} onClick={onViewAllOrders}>
          전체 주문 보기 <ArrowRight size={14} style={{ marginLeft: 6, display: "inline", verticalAlign: "middle" }} />
        </button>
      </div>

      {/* 상단 요약 */}
      <div style={{ ...styles.statGrid, gridTemplateColumns: "repeat(2, 1fr)" }}>
        {topStats.map((stat, i) => (
          <div key={i} style={styles.statCard}>
            <div style={styles.statLabel}>{stat.label}</div>
            <div style={styles.statValue}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* 상태별 주문 현황 */}
      <div style={{ ...styles.card, marginBottom: 20 }}>
        <div style={styles.cardHeader}>
          <div style={styles.cardTitle}>오늘 주문 상태별 현황</div>
        </div>
        <div style={{ display: "flex", padding: "16px 22px", gap: 12, flexWrap: "wrap" as const }}>
          {statusCounts.map(({ status, label, count, colors }) => (
            <div
              key={status}
              style={{
                flex: 1,
                minWidth: 100,
                padding: "14px 16px",
                borderRadius: 10,
                background: colors?.bg ?? "#f5f5f5",
                display: "flex",
                flexDirection: "column" as const,
                gap: 6,
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 600, color: colors?.color ?? "#555" }}>{label}</span>
              <span style={{ fontSize: 24, fontWeight: 700, color: colors?.color ?? "#555" }}>{count}건</span>
            </div>
          ))}
        </div>
      </div>

      {/* 차트 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>시간대별 주문</div>
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
            <div style={styles.cardTitle}>시간대별 매출 (취소 제외)</div>
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
