<!-- HEADER -->
<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6F4E37,100:C8A27C&height=200&section=header&text=Cozy%20Coffee&fontSize=70&fontColor=ffffff&fontAlignY=35&desc=Specialty%20Coffee%20Shop%20·%20Frontend&descSize=20&descAlignY=58&animation=fadeIn" width="100%" />

### ☕ 스페셜티 커피 원두 쇼핑몰 — Frontend

고객용 쇼핑 페이지와 관리자용 어드민 페이지로 구성된 풀스택 커머스 서비스의 프론트엔드입니다.<br/>
Railway에 배포된 Spring Boot 백엔드와 완전 연동되어 동작합니다.

<br/>

[![Live](https://img.shields.io/badge/🌐_Live_Demo-Visit-6F4E37?style=for-the-badge)](https://fe-three-eta.vercel.app)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://fe-three-eta.vercel.app)

</div>

<br/>

## 🛠️ Tech Stack

<div align="center">

### Framework & Language
![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

### Styling & UI
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![SweetAlert2](https://img.shields.io/badge/SweetAlert2-FF6F61?style=for-the-badge&logo=sweetalert&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide_React-F56565?style=for-the-badge&logo=lucide&logoColor=white)

### Tooling
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Turbopack](https://img.shields.io/badge/Turbopack-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)

</div>

<br/>

| 분류 | 기술 |
|------|------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 |
| **Alert / Dialog** | SweetAlert2 |
| **Icons** | Lucide React |
| **Font** | Pretendard (`@fontsource/pretendard`) |
| **Package Manager** | pnpm |
| **Runtime** | Node.js |

<br/>

## ✨ 주요 기능

<details open>
<summary><b>🛍️ 고객 페이지</b></summary>

<br/>

| 페이지 | 기능 |
|--------|------|
| **메인 홈** | Hero 배너 · 브랜드 소개 · 원두 상품 목록(API) · 품절 상품 오버레이 |
| **상품 상세** | 원두 정보(API) · Cup Note / Flavor Profile / Blend Story / Tasting Note · 재고 10개 이하 경고 · 수량 직접 입력 |
| **장바구니** | 상품 담기 / 수량 조절 / 선택 삭제 · 재고 초과 차단 · `cart_token` 쿠키 연동 |
| **바로 구매하기** | 해당 상품만 선택된 상태로 주문 페이지 즉시 진입 |
| **주문** | 이메일 + 주소 입력(다음 우편번호 API) · 재고 부족 안내 · 주문 후 장바구니 자동 비움 |
| **주문 완료** | SVG 애니메이션 체크마크 (circle → checkmark 순차 드로잉) |
| **마이페이지** | 이메일로 주문 내역 조회 · PENDING / PROCESSING 상태 주문 취소 |
| **공통** | 🌙 다크모드 · 📱 모바일 반응형 (전 페이지 지원) |

</details>

<details open>
<summary><b>🔧 어드민 페이지</b> &nbsp;<code>/api/admin</code> &nbsp;<sub>(/admin 접속 시 자동 리다이렉트)</sub></summary>

<br/>

| 탭 | 기능 |
|----|------|
| **대시보드** | 오늘 주문 수 · 오늘 매출(취소 제외) · 시간대별 주문·매출 차트 · 이달의 베스트 상품 |
| **주문 관리** | 상태 필터링 · 드롭다운 상태 변경 · 묶음 주문 그룹화 (토글 확장, 취소 제외 합산) |
| **메뉴 관리** | 상품 추가 / 수정 / 삭제 (삭제 시 확인창) |

</details>

<br/>

## 🔗 백엔드 연동

```
🖥️  배포 주소 : https://be-production-9ee1.up.railway.app
```

Next.js `rewrite`를 프록시로 사용하여 **CORS 없이** 백엔드와 통신합니다.

```
/api/*  ──►  https://be-production-9ee1.up.railway.app/api/*
```

### 환경변수

| 변수명 | 설명 | 기본값 |
|--------|------|--------|
| `BACKEND_URL` | 백엔드 서버 주소 | `https://be-production-9ee1.up.railway.app` |

`.env.local`에서 재정의 가능:

```env
BACKEND_URL=http://localhost:8080
```

<br/>

## 📡 API 연동 현황

<details>
<summary><b>전체 엔드포인트 펼쳐보기 (17개)</b></summary>

<br/>

| 기능 | 상태 | 엔드포인트 |
|------|:----:|-----------|
| 상품 목록 조회 | ✅ | `GET /api/products` |
| 상품 상세 조회 | ✅ | `GET /api/products/{id}` |
| 장바구니 조회 | ✅ | `GET /api/cart` |
| 장바구니 상품 추가 | ✅ | `POST /api/cart/items` |
| 장바구니 수량 변경 | ✅ | `PATCH /api/cart/items/{cartItemId}` |
| 장바구니 상품 삭제 | ✅ | `DELETE /api/cart/items/{cartItemId}` |
| 주문 생성 | ✅ | `POST /api/orders` |
| 마이페이지 - 주문 조회 | ✅ | `GET /api/orders?email=` |
| 마이페이지 - 주문 취소 | ✅ | `PATCH /api/{orderId}/status?status=CANCELLED` |
| 어드민 - 주문 목록 조회 | ✅ | `GET /api/admin/orders` |
| 어드민 - 묶음 주문 조회 | ✅ | `GET /api/admin/orders/grouped` |
| 어드민 - 주문 상태 변경 | ✅ | `PATCH /api/admin/{orderId}/status` |
| 어드민 - 상품 목록 조회 | ✅ | `GET /api/admin/products` |
| 어드민 - 상품 추가 | ✅ | `POST /api/admin/products` |
| 어드민 - 상품 수정 | ✅ | `PATCH /api/admin/products/{id}` |
| 어드민 - 상품 삭제 | ✅ | `DELETE /api/admin/products/{id}` |
| 어드민 - 베스트 상품 | ✅ | `GET /api/admin/products/best-selling` |

</details>

<br/>

## 📁 프로젝트 구조

```
FE/
├── public/images/                # 상품 썸네일 이미지 (정적)
├── src/
│   ├── lib/productMapper.ts      # 백엔드 응답 → 프론트 타입 변환
│   └── app/
│       ├── page.tsx              # 메인 홈 (/)
│       ├── layout.tsx            # 루트 레이아웃
│       ├── globals.css           # 전역 스타일 + 애니메이션 keyframes
│       ├── admin/                # /admin → /api/admin 리다이렉트
│       ├── api/admin/            # 어드민 페이지 (/api/admin)
│       │   ├── _components/      # DashboardTab · MenuTab · MenuModal · OrdersTab · Sidebar
│       │   └── api.ts · constants.ts · data.ts · page.tsx · styles.ts · types.ts
│       ├── customer/             # 고객 공통 컴포넌트
│       │   └── _components/      # Navbar · Footer · HeroSection · ProductCard · ProductList · ...
│       ├── cart/                 # 장바구니 (/cart)
│       ├── order/                # 주문 (/order)
│       │   └── complete/         # 주문 완료 (SVG 애니메이션 체크마크)
│       ├── mypage/               # 마이페이지 (/mypage)
│       └── products/[id]/        # 상품 상세 (/products/:id)
│           └── _components/      # ProductHero · FlavorProfile · TastingNote · BlendStory · ...
├── next.config.ts                # 백엔드 프록시 rewrite 설정
├── package.json
├── tsconfig.json
└── postcss.config.mjs
```

<br/>

## 🚀 시작하기

```bash
# 1. 패키지 설치
pnpm install

# 2. 개발 서버 실행
pnpm dev

# 3. 빌드 & 프로덕션 실행
pnpm build
pnpm start
```

| 페이지 | URL |
|--------|-----|
| 🛍️ 고객 페이지 | http://localhost:3000 |
| 🔧 어드민 페이지 | http://localhost:3000/api/admin |

<br/>

## 🌐 외부 API

- **다음 우편번호 API** — 주문 페이지 주소 검색
- **Railway 백엔드** — Spring Boot 기반 REST API 서버

<br/>

## 👥 Frontend Team

<div align="center">

| 한철완 | 이준영 | 임승빈 |
|:------:|:------:|:------:|
| 🛍️ **고객 페이지** | 🔧 **어드민 페이지** | 🚀 **배포** |

</div>

<br/>

<!-- FOOTER -->
<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:C8A27C,100:6F4E37&height=120&section=footer" width="100%" />

</div>
