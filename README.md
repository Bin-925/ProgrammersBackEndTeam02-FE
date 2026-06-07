# ☕ Coffee Shop — Team02 Frontend

스페셜티 커피 원두 쇼핑몰 프론트엔드 프로젝트입니다.  
고객용 쇼핑 페이지와 관리자용 어드민 페이지로 구성되어 있습니다.

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
- **메인 홈** — Hero 배너, 브랜드 소개, 원두 상품 목록
- **상품 상세** — 원두 정보, Cup Note, Flavor Profile, Blend Story, Tasting Note
- **장바구니** — 상품 담기 / 수량 조절 / 선택 삭제 (localStorage 기반, API 연동 예정)
- **주문** — 이메일 + 주소 입력 (다음 우편번호 API), 주문 요약 및 결제
- **마이페이지** — 이메일로 주문 내역 조회 및 주문 취소

### 어드민 페이지 (`/admin`)
- **대시보드** — 오늘 주문 수 / 오늘 매출 / 처리 대기 주문 현황
- **주문 관리** — 상태 필터링, 드롭다운으로 주문 상태 변경 (API 연동)
- **메뉴 관리** — 상품 추가 / 수정 / 삭제 (API 연동)

---

## 파일 구조

```
FE/
├── public/
│   └── images/                  # 상품 썸네일 이미지
├── src/
│   └── app/
│       ├── page.tsx             # 메인 홈 (/)
│       ├── layout.tsx           # 루트 레이아웃
│       ├── globals.css
│       │
│       ├── admin/               # 어드민 페이지 (/admin)
│       │   ├── _components/
│       │   │   ├── DashboardTab.tsx
│       │   │   ├── MenuModal.tsx
│       │   │   ├── MenuTab.tsx
│       │   │   ├── OrdersTab.tsx
│       │   │   └── Sidebar.tsx
│       │   ├── api.ts           # 어드민 API 호출 함수
│       │   ├── constants.ts
│       │   ├── data.ts
│       │   ├── layout.tsx
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
│       │   ├── data.ts          # 상품 목록 더미 데이터
│       │   └── types.ts
│       │
│       ├── cart/                # 장바구니 (/cart)
│       │   ├── cartUtils.ts     # localStorage 유틸
│       │   ├── page.tsx
│       │   └── types.ts
│       │
│       ├── order/               # 주문 (/order)
│       │   ├── complete/
│       │   │   └── page.tsx     # 주문 완료 페이지
│       │   └── page.tsx
│       │
│       ├── mypage/              # 마이페이지 (/mypage)
│       │   ├── data.ts          # 주문 더미 데이터
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
│               ├── data.ts
│               ├── page.tsx
│               └── types.ts
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

### 빌드

```bash
pnpm build
pnpm start
```

---

## API 연동 현황

| 기능 | 상태 | API |
|------|------|-----|
| 어드민 - 주문 목록 조회 | | |
| 어드민 - 상품 목록 조회 | | |
| 어드민 - 상품 추가 | | |
| 어드민 - 상품 수정 | | |
| 어드민 - 상품 삭제 | | |
| 어드민 - 주문 상태 변경 | | |
| 장바구니 | | |
| 주문 생성 | | |
| 마이페이지 - 주문 조회 | | |

---

## 외부 API

- **다음 우편번호 API** — 주문 페이지 주소 검색에 사용

---

## 프론트엔드 담당

| 이름 | 담당 |
|------|------|
| 한철완 | 고객 페이지 |
| 이준영 | 어드민 페이지 |
