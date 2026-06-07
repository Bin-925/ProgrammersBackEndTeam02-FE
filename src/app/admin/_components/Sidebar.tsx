import { NAV_ITEMS } from "../constants";
import { styles } from "../styles";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>
        <div style={styles.logoTitle}>☕ Cozy Coffee</div>
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
        <div style={styles.sidebarLink}>← 고객 사이트 보기</div>
      </div>
    </div>
  );
}
