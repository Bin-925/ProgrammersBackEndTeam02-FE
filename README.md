# ☕ Coffee Shop — Team02 Frontend

스페셜티 커피 원두 쇼핑몰 프론트엔드 프로젝트입니다.  
고객용 쇼핑 페이지와 관리자용 어드민 페이지로 구성되어 있으며, Railway에 배포된 Spring Boot 백엔드와 완전 연동되어 있습니다.

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Font | Pretendard (@fontsource/pretendard) |
| Package Manager | pnpm |
| Runtime | Node.js |

---

## 주요 기능

### 고객 페이지
- **메인 홈** — Hero 배너, 브랜드 소개, 원두 상품 목록 (백엔드 API 조회)
- **상품 상세** — 원두 정보(API), Cup Note / Flavor Profile / Blend Story / Tasting Note (정적 데이터 병합)
- **장바구니** — 상품 담기 / 수량 조절 / 선택 삭제 (백엔드 쿠키 기반 cart_token 연동)
- **주문** — 이메일 + 주소 입력 (다음 우편번호 API), 주문 생성 후 장바구니 자동 비움
- **마이페이지** — 이메일로 주문 내역 조회, PENDING/PROCESSING 상태 주문 취소 가능

### 어드민 페이지 (`/api/admin`, `/admin` 접속 시 자동 리다이렉트)
- **대시보드** — 오늘 주문 수 / 오늘 매출(취소 제외) / 상태별 주문 현황 (PENDING·PROCESSING·SHIPPING·DELIVERED·CANCELLED)
- **주문 관리** — 상태 필터링, 드롭다운으로 주문 상태 변경
- **메뉴 관리** — 상품 추가 / 수정 / 삭제

---

## 백엔드 연동

백엔드 배포 주소: `https://be-production-9ee1.up.railway.app`

Next.js rewrite를 프록시로 사용하여 CORS 없이 백엔드와 통신합니다.

```
/api/*   →  https://be-production-9ee1.up.railway.app/api/*
/cart/*  →  https://be-production-9ee1.up.railway.app/cart/*
```

### 환경변수

| 변수명 | 설명 | 기본값 |
|--------|------|--------|
| `BACKEND_URL` | 백엔드 서버 주소 | `https://be-production-9ee1.up.railway.app` |

`.env.local` 파일에서 재정의 가능:
```env
BACKEND_URL=http://localhost:8080
```

---

## API 연동 현황

| 기능 | 상태 | 엔드포인트 |
|------|------|-----------|
| 상품 목록 조회 | ✅ 완료 | `GET /api/products` |
| 상품 상세 조회 | ✅ 완료 | `GET /api/products/{id}` |
| 장바구니 조회 | ✅ 완료 | `GET /api/cart` |
| 장바구니 상품 추가 | ✅ 완료 | `POST /api/cart/items` |
| 장바구니 수량 변경 | ✅ 완료 | `PATCH /cart/items/{cartItemId}` |
| 장바구니 상품 삭제 | ✅ 완료 | `DELETE /cart/items/{cartItemId}` |
| 주문 생성 | ✅ 완료 | `POST /api/orders` |
| 마이페이지 - 주문 조회 | ✅ 완료 | `GET /api/orders?email=` |
| 마이페이지 - 주문 취소 | ✅ 완료 | `PATCH /api/{orderId}/status?status=CANCELLED` |
| 어드민 - 주문 목록 조회 | ✅ 완료 | `GET /api/admin/orders` |
| 어드민 - 주문 상태 변경 | ✅ 완료 | `PATCH /api/admin/{orderId}/status` |
| 어드민 - 상품 목록 조회 | ✅ 완료 | `GET /api/admin/products` |
| 어드민 - 상품 추가 | ✅ 완료 | `POST /api/admin/products` |
| 어드민 - 상품 수정 | ✅ 완료 | `PATCH /api/admin/products/{id}` |
| 어드민 - 상품 삭제 | ✅ 완료 | `DELETE /api/admin/products/{id}` |

---

## 파일 구조

```
FE/
├── public/
│   └── images/                  # 상품 썸네일 이미지 (정적)
├── src/
│   ├── lib/
│   │   └── productMapper.ts     # 백엔드 응답 → 프론트 타입 변환
│   └── app/
│       ├── page.tsx             # 메인 홈 (/)
│       ├── layout.tsx           # 루트 레이아웃
│       ├── globals.css
│       │
│       ├── admin/               # /admin → /api/admin 리다이렉트
│       │
│       ├── api/admin/           # 어드민 페이지 (/api/admin)
│       │   ├── _components/
│       │   │   ├── DashboardTab.tsx
│       │   │   ├── MenuModal.tsx
│       │   │   ├── MenuTab.tsx
│       │   │   ├── OrdersTab.tsx
│       │   │   └── Sidebar.tsx
│       │   ├── api.ts           # 어드민 API 호출 함수
│       │   ├── constants.ts
│       │   ├── data.ts          # 폼 초기값
│       │   ├── page.tsx
│       │   ├── styles.ts
│       │   └── types.ts
│       │
│       ├── customer/            # 고객 공통 컴포넌트
│       │   ├── _components/
│       │   │   ├── CartIcon.tsx
│       │   │   ├── Footer.tsx
│       │   │   ├── HeroSection.tsx
│       │   │   ├── Navbar.tsx
│       │   │   ├── ProductCard.tsx
│       │   │   ├── ProductList.tsx
│       │   │   ├── ProductsNavLink.tsx
│       │   │   └── WhySection.tsx
│       │   ├── data.ts          # 상품 타입 정의 및 로스팅 라벨
│       │   └── types.ts
│       │
│       ├── cart/                # 장바구니 (/cart)
│       │   ├── cartUtils.ts     # 백엔드 API 기반 장바구니 유틸
│       │   ├── page.tsx
│       │   └── types.ts
│       │
│       ├── order/               # 주문 (/order)
│       │   ├── complete/
│       │   │   └── page.tsx     # 주문 완료 페이지
│       │   └── page.tsx
│       │
│       ├── mypage/              # 마이페이지 (/mypage)
│       │   ├── page.tsx
│       │   └── types.ts
│       │
│       └── products/
│           └── [id]/            # 상품 상세 (/products/:id)
│               ├── _components/
│               │   ├── BlendStorySection.tsx
│               │   ├── CupNoteSection.tsx
│               │   ├── FadeInSection.tsx
│               │   ├── FlavorProfileSection.tsx
│               │   ├── ProductHero.tsx
│               │   └── TastingNoteSection.tsx
│               ├── data.ts      # 상품 상세 정적 콘텐츠 (Cup Note 등)
│               ├── page.tsx
│               └── types.ts
├── next.config.ts               # 백엔드 프록시 rewrite 설정
├── package.json
├── tsconfig.json
└── postcss.config.mjs
```

---

## 시작하기

### 패키지 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 접속  
어드민: [http://localhost:3000/api/admin](http://localhost:3000/api/admin)

### 빌드

```bash
pnpm build
pnpm start
```

---

## 외부 API

- **다음 우편번호 API** — 주문 페이지 주소 검색에 사용
- **Railway 백엔드** — Spring Boot 기반 REST API 서버

---

## 프론트엔드 담당

| 이름 | 담당 |
|------|------|
| 한철완 | 고객 페이지 |
| 이준영 | 어드민 페이지 |
| 임승빈 | 배포 |
