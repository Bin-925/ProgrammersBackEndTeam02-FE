import type { ProductDetail } from "./types";

export const productDetails: ProductDetail[] = [
  {
    id: 1,
    name: "콜롬비아 나리뇨",
    price: 20000,
    weight: "250g",
    roasting: "미디엄",
    isDecaf: false,
    acidity: true,
    shortDescription: "블랙베리와 자몽의 생동감 있는 산미, 은은한 카라멜의 달콤함이 균형을 이루는 미디엄 로스팅 원두입니다.",
    thumbnailUrl: "/images/colombia-narino-thumb.png",
    cupNote: {
      title: "블랙베리, 자몽, 카라멜",
      scores: {
        overall: 4,
        body: 3,
        acidity: 5,
        balance: 4,
        flavor: 4,
        sweetness: 3,
      },
    },
    flavorProfile: {
      notes: "블랙베리, 자몽, 카라멜",
      floralFruity: 38,
      roastLevel: 50,
    },
    blendStory: {
      content:
        "콜롬비아 나리뇨 주(州)는 에콰도르 국경과 맞닿은 안데스 고원 지대에 위치합니다. 해발 2,000m 이상의 고도와 풍부한 강수량이 만들어내는 독특한 미기후는 복합적인 산미와 달콤한 과일향을 지닌 스페셜티 원두 생산에 최적화되어 있습니다.\n\n현지 소규모 농가들이 정성껏 핸드피킹한 체리를 워시드 방식으로 가공하여 깨끗하고 투명한 풍미를 구현합니다. 한 잔에 담긴 블랙베리와 자몽의 생동감 있는 산미는 코지커피가 나리뇨에서 직접 소싱한 이유입니다.",
    },
    tastingNote: { x: 60, y: 50 },
  },
  {
    id: 2,
    name: "브라질 세라 두 카파라오",
    price: 22000,
    weight: "250g",
    roasting: "다크",
    isDecaf: false,
    acidity: false,
    shortDescription: "진한 다크초콜릿과 헤이즐넛의 고소함, 묵직한 바디감이 특징인 에스프레소에 최적화된 원두입니다.",
    thumbnailUrl: "/images/brazil-thumb.png",
    cupNote: {
      title: "다크초콜릿, 헤이즐넛, 카라멜",
      scores: {
        overall: 5,
        body: 5,
        acidity: 2,
        balance: 4,
        flavor: 4,
        sweetness: 3,
      },
    },
    flavorProfile: {
      notes: "다크초콜릿, 헤이즐넛, 카라멜",
      floralFruity: 78,
      roastLevel: 82,
    },
    blendStory: {
      content:
        "브라질 미나스 제라이스 주 세라 두 카파라오 산맥에 자리한 농장에서 생산되는 원두입니다. 1,400m~1,700m 고도의 화산성 토양이 묵직한 바디감과 깊은 초콜릿 향을 만들어냅니다.\n\n내추럴 건식 가공법으로 처리된 이 원두는 과육의 단맛이 생두에 충분히 스며들어 카카오와 헤이즐넛의 풍부한 풍미를 선사합니다. 에스프레소로도, 드립으로도 뛰어난 결과를 보여주는 올라운드 원두입니다.",
    },
    tastingNote: { x: 18, y: 82 },
  },
  {
    id: 3,
    name: "콜롬비아 킨디오",
    price: 23000,
    weight: "250g",
    roasting: "라이트",
    isDecaf: false,
    acidity: true,
    shortDescription: "화이트와인 효모 발효로 탄생한 복숭아와 재스민의 독특한 풍미, 스페셜티 커피의 진수를 경험하세요.",
    thumbnailUrl: "/images/colombia-quindio-thumb.png",
    cupNote: {
      title: "화이트와인, 복숭아, 재스민",
      scores: {
        overall: 4,
        body: 2,
        acidity: 5,
        balance: 3,
        flavor: 5,
        sweetness: 4,
      },
    },
    flavorProfile: {
      notes: "화이트와인, 복숭아, 재스민",
      floralFruity: 22,
      roastLevel: 20,
    },
    blendStory: {
      content:
        "콜롬비아 커피 벨트의 심장부, 킨디오 주에서 생산됩니다. 이 원두의 가장 큰 특징은 화이트와인 효모를 활용한 혁신적인 애나에로빅(무산소) 발효 방식입니다. 커피 체리를 밀폐 탱크에서 72시간 발효시켜 어느 원두에서도 경험할 수 없는 독특한 와인 풍미를 구현합니다.\n\n처음 한 모금에 놀라움을 선사하는 복숭아와 재스민의 향미, 그리고 화이트와인을 연상시키는 생동감 있는 산미가 특징입니다. 스페셜티 커피를 사랑하는 분께 강력히 추천드립니다.",
    },
    tastingNote: { x: 82, y: 18 },
  },
  {
    id: 4,
    name: "에티오피아 시다모",
    price: 21000,
    weight: "250g",
    roasting: "라이트",
    isDecaf: true,
    acidity: true,
    shortDescription: "블루베리와 장미향이 어우러진 에티오피아 디카페인 원두, 스위스워터® 공법으로 풍미는 그대로.",
    thumbnailUrl: "/images/ethiopia-thumb.png",
    cupNote: {
      title: "블루베리, 레몬, 장미",
      scores: {
        overall: 4,
        body: 2,
        acidity: 4,
        balance: 4,
        flavor: 5,
        sweetness: 5,
      },
    },
    flavorProfile: {
      notes: "블루베리, 레몬, 장미",
      floralFruity: 12,
      roastLevel: 15,
    },
    blendStory: {
      content:
        "에티오피아 시다모 지역은 커피의 발상지로 불리는 곳입니다. 야생에 가까운 환경에서 자란 헤어룸 품종의 커피나무는 독보적인 꽃 향과 과일향을 만들어냅니다.\n\n코지커피의 에티오피아 시다모는 스위스워터® 공법을 통해 카페인을 99.9% 제거하면서도 원두 본연의 풍미를 그대로 보존했습니다. 블루베리, 레몬, 장미 향이 어우러진 이 원두는 카페인에 민감한 분도 부담 없이 스페셜티 커피의 진수를 경험하실 수 있도록 기획되었습니다.",
    },
    tastingNote: { x: 87, y: 14 },
  },
];
