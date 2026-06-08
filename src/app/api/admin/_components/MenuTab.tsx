import { ROASTING_LEVEL_LABEL } from "../constants";
import { styles } from "../styles";
import type { Product } from "../types";

interface MenuTabProps {
  products: Product[];
  onAddNew: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function MenuTab({ products, onAddNew, onEdit, onDelete }: MenuTabProps) {
  return (
    <>
      <div style={styles.topRow}>
        <div style={styles.pageHeader}>
          <div style={styles.pageTitle}>메뉴 관리</div>
          <div style={styles.pageSubtitle}>총 {products.length}개 상품</div>
        </div>
        <button style={{ ...styles.btn, ...styles.btnPrimary }} onClick={onAddNew}>
          + 새 상품 추가
        </button>
      </div>

      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              {["상품명", "로스팅", "디카페인", "산미", "가격", "재고", "작업"].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td style={styles.td}>
                  <div style={styles.productCell}>
                    {product.thumbnailImageUrl
                      ? <img src={product.thumbnailImageUrl} alt={product.productName} style={styles.productImg} />
                      : <div style={{ ...styles.productImg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🫘</div>
                    }
                    <div>
                      <div style={styles.productName}>{product.productName}</div>
                      <div style={styles.productDesc}>{product.description}</div>
                    </div>
                  </div>
                </td>
                <td style={styles.td}>
                  <span style={styles.roastBadge(product.roastingLevel)}>
                    {ROASTING_LEVEL_LABEL[product.roastingLevel]}
                  </span>
                </td>
                <td style={styles.td}>{product.decaf ? "✓" : "—"}</td>
                <td style={styles.td}>{product.acidity ? "✓" : "—"}</td>
                <td style={{ ...styles.td, fontWeight: 600 }}>₩{product.productPrice.toLocaleString()}</td>
                <td style={styles.td}>{product.stock}개</td>
                <td style={styles.td}>
                  <button style={styles.btnEdit}   onClick={() => onEdit(product)}>수정</button>
                  <button style={styles.btnDanger} onClick={() => onDelete(product.id)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
