"use client";

import { useEffect, useState } from "react";
import { createProduct, deleteProduct, fetchOrders, fetchProducts, updateOrderStatus, updateProduct } from "./api";
import { EMPTY_PRODUCT_FORM } from "./data";
import { styles } from "./styles";
import type { Order, OrderStatus, Product, ProductForm } from "./types";

import DashboardTab from "./_components/DashboardTab";
import MenuModal    from "./_components/MenuModal";
import MenuTab      from "./_components/MenuTab";
import OrdersTab    from "./_components/OrdersTab";
import Sidebar      from "./_components/Sidebar";

export default function AdminPage() {
  // ─── 상태 ────────────────────────────────────────────
  const [page, setPage]           = useState("dashboard");
  const [orders, setOrders]       = useState<Order[]>([]);
  const [products, setProducts]   = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filterStatus, setFilterStatus]       = useState("전체");
  const [showMenuModal, setShowMenuModal]       = useState(false);
  const [editingProduct, setEditingProduct]     = useState<Product | null>(null);
  const [productForm, setProductForm]           = useState<ProductForm>(EMPTY_PRODUCT_FORM);
  const [openDropdownId, setOpenDropdownId]     = useState<number | null>(null);

  // ─── 초기 데이터 로드 ─────────────────────────────────
  useEffect(() => {
    Promise.allSettled([fetchOrders(), fetchProducts()])
      .then(([ordersResult, productsResult]) => {
        if (ordersResult.status === "fulfilled") setOrders(ordersResult.value);
        if (productsResult.status === "fulfilled") setProducts(productsResult.value);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // ─── 파생 값 ─────────────────────────────────────────
  const today       = new Date().toLocaleDateString("sv"); // 로컬(KST) 날짜 "YYYY-MM-DD"
  const todayOrders = orders.filter(o => {
    // 백엔드가 UTC LocalDateTime을 Z 없이 내려주므로 강제로 UTC 파싱
    const utcStr = o.createdAt.endsWith("Z") ? o.createdAt : o.createdAt + "Z";
    const orderDate = new Date(utcStr).toLocaleDateString("sv");
    return orderDate === today;
  });
  const pendingCount = orders.filter(o => o.orderStatus === "PENDING" || o.orderStatus === "PROCESSING").length;
  const todayRevenue = todayOrders.filter(o => o.orderStatus !== "CANCELLED").reduce((sum, o) => sum + o.totalPrice, 0);
  const filteredOrders = orders.filter(o =>
    filterStatus === "전체" || o.orderStatus === filterStatus
  );

  // ─── 주문 핸들러 ──────────────────────────────────────
  const handleOrderStatusChange = async (orderId: number, newStatus: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: newStatus } : o));
      setOpenDropdownId(null);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "주문 상태 변경 실패");
    }
  };

  // ─── 메뉴 핸들러 ──────────────────────────────────────
  const handleOpenModal = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        productName:        product.productName,
        decaf:              product.decaf,
        roastingLevel:      product.roastingLevel,
        acidity:            product.acidity,
        productPrice:       String(product.productPrice),
        stock:              String(product.stock),
        description:        product.description,
        thumbnailImageUrl:  product.thumbnailImageUrl,
        detailPageImageUrl: product.detailPageImageUrl,
      });
    } else {
      setEditingProduct(null);
      setProductForm(EMPTY_PRODUCT_FORM);
    }
    setShowMenuModal(true);
  };

  const handleSaveProduct = async () => {
    if (!productForm.productName || !productForm.productPrice || !productForm.stock) {
      alert("상품명, 가격, 재고는 필수 입력입니다.");
      return;
    }
    const price = parseInt(productForm.productPrice);
    const stock = parseInt(productForm.stock);
    if (isNaN(price) || isNaN(stock)) {
      alert("가격과 재고는 숫자로 입력해주세요.");
      return;
    }
    const thumbUrl  = productForm.thumbnailImageUrl.trim();
    const detailUrl = (productForm.detailPageImageUrl.trim() || thumbUrl);
    const payload = {
      productName:        productForm.productName.trim(),
      isDecaf:            productForm.decaf,
      roastingLevel:      productForm.roastingLevel,
      acidity:            productForm.acidity,
      productPrice:       price,
      stock:              stock,
      description:        productForm.description.trim(),
      thumbnailImageUrl:  thumbUrl,
      detailPageImageUrl: detailUrl,
    };
    try {
      if (editingProduct) {
        const updated = await updateProduct(editingProduct.id, payload);
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? updated : p));
      } else {
        await createProduct(payload);
      }
      setShowMenuModal(false);
      fetchProducts().then(setProducts).catch(() => {});
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "저장 실패");
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("상품을 삭제하시겠습니까?")) return;
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "삭제 실패");
    }
  };

  const updateForm = (field: keyof ProductForm, value: string | boolean) =>
    setProductForm(prev => ({ ...prev, [field]: value }));

  // ─── 렌더 ─────────────────────────────────────────────
  return (
    <div style={styles.root}>
      <Sidebar currentPage={page} onNavigate={setPage} />

      <div style={styles.main}>
        {isLoading ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <span style={{ fontSize: 14, color: "#8a7a6a" }}>불러오는 중...</span>
          </div>
        ) : (
          <>
            {page === "dashboard" && (
              <DashboardTab
                todayOrders={todayOrders}
                todayRevenue={todayRevenue}
                onViewAllOrders={() => setPage("orders")}
              />
            )}

            {page === "orders" && (
              <OrdersTab
                filteredOrders={filteredOrders}
                filterStatus={filterStatus}
                openDropdownId={openDropdownId}
                onFilterStatusChange={setFilterStatus}
                onOrderStatusChange={handleOrderStatusChange}
                onDropdownToggle={setOpenDropdownId}
              />
            )}

            {page === "menu" && (
              <MenuTab
                products={products}
                onAddNew={() => handleOpenModal()}
                onEdit={handleOpenModal}
                onDelete={handleDeleteProduct}
              />
            )}
          </>
        )}
      </div>

      {showMenuModal && (
        <MenuModal
          isEditing={editingProduct !== null}
          form={productForm}
          onClose={() => setShowMenuModal(false)}
          onSave={handleSaveProduct}
          onFormChange={updateForm}
        />
      )}
    </div>
  );
}
