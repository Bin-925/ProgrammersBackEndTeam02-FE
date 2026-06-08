export interface CupNoteScores {
  overall: number;
  body: number;
  acidity: number;
  balance: number;
  flavor: number;
  sweetness: number;
}

export interface ProductDetail {
  id: number;
  name: string;
  price: number;
  weight: string;
  roasting: "라이트" | "미디엄" | "다크";
  isDecaf: boolean;
  acidity: boolean;
  shortDescription: string;
  thumbnailUrl: string;
  cupNote: {
    title: string;
    scores: CupNoteScores;
  };
  flavorProfile: {
    notes: string;
    floralFruity: number; // 0 = 플로럴/프루티, 100 = 다크초콜릿
    roastLevel: number;   // 0 = 라이트, 100 = 다크
  };
  blendStory: {
    content: string;
  };
  tastingNote: {
    x: number; // 0 = bold/bittersweet, 100 = floral/fruity
    y: number; // 0 = light, 100 = dark
  };
}
