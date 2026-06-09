import { ROASTING_LEVELS } from "../constants";
import { styles } from "../styles";
import type { ProductForm } from "../types";

interface MenuModalProps {
  isEditing: boolean;
  form: ProductForm;
  onClose: () => void;
  onSave: () => void;
  onFormChange: (field: keyof ProductForm, value: string | boolean) => void;
}

export default function MenuModal({ isEditing, form, onClose, onSave, onFormChange }: MenuModalProps) {
  return (
    <div style={styles.modal} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={styles.modalBox}>
        <div style={styles.modalTitle}>{isEditing ? "상품 수정" : "새 상품 추가"}</div>

        <div style={styles.formGroup}>
          <label style={styles.formLabel}>상품명</label>
          <input style={styles.formInput} value={form.productName} onChange={e => onFormChange("productName", e.target.value)} placeholder="예: 에티오피아 예가체프" />
        </div>

        <div style={styles.formRow}>
          <div style={{ ...styles.formGroup, flex: 1 }}>
            <label style={styles.formLabel}>로스팅</label>
            <select style={{ ...styles.formInput, ...styles.select }} value={form.roastingLevel} onChange={e => onFormChange("roastingLevel", e.target.value)}>
              {ROASTING_LEVELS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div style={{ ...styles.formGroup, flex: 1 }}>
            <label style={styles.formLabel}>가격 (₩)</label>
            <input style={styles.formInput} type="number" value={form.productPrice} onChange={e => onFormChange("productPrice", e.target.value)} placeholder="18000" />
          </div>
          <div style={{ ...styles.formGroup, flex: 1 }}>
            <label style={styles.formLabel}>재고</label>
            <input style={styles.formInput} type="number" value={form.stock} onChange={e => onFormChange("stock", e.target.value)} placeholder="100" />
          </div>
        </div>

        <div style={styles.formRow}>
          <div style={{ ...styles.formGroup, flex: 1 }}>
            <label style={styles.formCheckbox}>
              <input type="checkbox" checked={form.decaf} onChange={e => onFormChange("decaf", e.target.checked)} />
              디카페인
            </label>
          </div>
          <div style={{ ...styles.formGroup, flex: 1 }}>
            <label style={styles.formCheckbox}>
              <input type="checkbox" checked={form.acidity} onChange={e => onFormChange("acidity", e.target.checked)} />
              산미
            </label>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.formLabel}>상품 설명</label>
          <input style={styles.formInput} value={form.description} onChange={e => onFormChange("description", e.target.value)} placeholder="상품에 대한 설명을 입력하세요" />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.formLabel}>썸네일 이미지 URL</label>
          <input style={styles.formInput} autoComplete="off" value={form.thumbnailImageUrl} onChange={e => onFormChange("thumbnailImageUrl", e.target.value)} placeholder="이미지 주소 입력" />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.formLabel}>상세 이미지 URL (비우면 썸네일 URL 사용)</label>
          <input style={styles.formInput} autoComplete="off" value={form.detailPageImageUrl} onChange={e => onFormChange("detailPageImageUrl", e.target.value)} placeholder="비워두면 썸네일 이미지 자동 적용" />
        </div>

        <div style={styles.modalActions}>
          <button style={styles.btnCancel} onClick={onClose}>취소</button>
          <button style={{ ...styles.btn, ...styles.btnPrimary }} onClick={onSave}>저장</button>
        </div>
      </div>
    </div>
  );
}
