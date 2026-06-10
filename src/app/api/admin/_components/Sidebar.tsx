import Link from "next/link";
import Image from "next/image";
import { NAV_ITEMS } from "../constants";
import { styles } from "../styles";
import { ArrowLeft } from "lucide-react";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <Image src="/images/logo.png" alt="Cozy Coffee" width={33} height={33} style={{ borderRadius: 6 }} unoptimized />
          <div style={styles.logoTitle}>코지커피</div>
        </div>
        <div style={styles.logoSub}>관리자 패널</div>
      </div>

      <nav style={styles.nav}>
        {NAV_ITEMS.map(item => (
          <div
            key={item.id}
            style={styles.navItem(currentPage === item.id)}
            onClick={() => onNavigate(item.id)}
          >
            <span style={styles.navIcon}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>

      <div style={styles.sidebarBottom}>
        <Link href="/" style={{ ...styles.sidebarLink, textDecoration: "none" }}>
          <ArrowLeft size={14} /> 고객 사이트 보기
        </Link>
      </div>
    </div>
  );
}
