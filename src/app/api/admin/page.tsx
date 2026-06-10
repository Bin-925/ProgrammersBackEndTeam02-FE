"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createProduct, deleteProduct, fetchGroupedOrders, fetchProducts, updateOrderStatus, updateProduct } from "./api";
import { EMPTY_PRODUCT_FORM } from "./data";
import { styles } from "./styles";
import type { GroupedOrder, Order, OrderStatus, Product, ProductForm } from "./types";

import DashboardTab from "./_components/DashboardTab";
import MenuModal    from "./_components/MenuModal";
import MenuTab      from "./_components/MenuTab";
import OrdersTab    from "./_components/OrdersTab";
import Sidebar      from "./_components/Sidebar";

export default function AdminPage() {
  // ─── 상태 ────────────────────────────────────────────
  const [page, setPage]                   = useState("dashboard");
  const [groupedOrders, setGroupedOrders] = useState<GroupedOrder[]>([]);
  const [products, setProducts]           = useState<Product[]>([]);
  const [isLoading, setIsLoading]         = useState(true);

  const [filterStatus, setFilterStatus]       = useState("전체");
  const [showMenuModal, setShowMenuModal]       = useState(false);
  const [editingProduct, setEditingProduct]     = useState<Product | null>(null);
  const [productForm, setProductForm]           = useState<ProductForm>(EMPTY_PRODUCT_FORM);
  const [openDropdownId, setOpenDropdownId]     = useState<number | null>(null);

  // ─── 초기 데이터 로드 ─────────────────────────────────
  useEffect(() => {
    Promise.allSettled([fetchGroupedOrders(), fetchProducts()])
      .then(([groupedResult, productsResult]) => {
        if (groupedResult.status === "fulfilled") setGroupedOrders(groupedResult.value);
        if (productsResult.status === "fulfilled") setProducts(productsResult.value);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // ─── 파생 값 ─────────────────────────────────────────
  // 대시보드 통계용: 그룹에서 개별 주문 flat하게 추출
  const allOrders: Order[] = groupedOrders.flatMap(group =>
    group.orders.map(o => ({
      id: o.orderId,
      customerEmail: group.customerEmail,
      address: group.address,
      zipCode: group.zipCode,
      orderStatus: o.orderStatus,
      totalPrice: o.totalPrice,
      createdAt: o.createdAt,
    }))
  );

  const today       = new Date().toLocaleDateString("sv");
  const todayOrders = allOrders.filter(o => {
    const utcStr = o.createdAt.endsWith("Z") ? o.createdAt : o.createdAt + "Z";
    return new Date(utcStr).toLocaleDateString("sv") === today;
  });
  const todayRevenue = todayOrders.filter(o => o.orderStatus !== "CANCELLED").reduce((sum, o) => sum + o.totalPrice, 0);

  // 필터: 그룹 내 적어도 하나의 주문이 선택된 상태와 일치하면 표시
  const filteredGroups = groupedOrders.filter(group =>
    filterStatus === "전체" || group.orders.some(o => o.orderStatus === filterStatus)
  );

  // ─── 주문 핸들러 ──────────────────────────────────────
  const handleOrderStatusChange = async (orderId: number, newStatus: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setGroupedOrders(prev => prev.map(group => ({
        ...group,
        orders: group.orders.map(o => o.orderId === orderId ? { ...o, orderStatus: newStatus } : o),
      })));
      setOpenDropdownId(null);
    } catch (err: unknown) {
      Swal.fire({ icon: "error", title: "변경 실패", text: err instanceof Error ? err.message : "주문 상태 변경 실패" });
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
      Swal.fire({ icon: "warning", title: "입력 오류", text: "상품명, 가격, 재고는 필수 입력입니다." });
      return;
    }
    const price = parseInt(productForm.productPrice);
    const stock = parseInt(productForm.stock);
    if (isNaN(price) || isNaN(stock)) {
      Swal.fire({ icon: "warning", title: "입력 오류", text: "가격과 재고는 숫자로 입력해주세요." });
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
      Swal.fire({ icon: "error", title: "저장 실패", text: err instanceof Error ? err.message : "저장 중 오류가 발생했습니다." });
    }
  };

  const handleDeleteProduct = async (id: number) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "상품 삭제",
      text: "상품을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      confirmButtonColor: "#d33",
    });
    if (!result.isConfirmed) return;
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err: unknown) {
      Swal.fire({ icon: "error", title: "삭제 실패", text: err instanceof Error ? err.message : "삭제 중 오류가 발생했습니다." });
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
                filteredGroups={filteredGroups}
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
