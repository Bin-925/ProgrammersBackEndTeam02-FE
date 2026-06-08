import type { ProductDetail } from "../types";

const CHART = 320;
const PAD = 32;
const PLOT = CHART - PAD * 2;

function TastingChart({
  products,
  currentId,
}: {
  products: ProductDetail[];
  currentId: number;
}) {
  return (
    <svg
      width={CHART}
      height={CHART}
      viewBox={`0 0 ${CHART} ${CHART}`}
      className="w-full max-w-xs"
    >
      {/* Background */}
      <rect width={CHART} height={CHART} fill="#fafaf9" rx="16" />

      {/* Dashed center lines */}
      <line
        x1={PAD} y1={CHART / 2}
        x2={CHART - PAD} y2={CHART / 2}
        stroke="#e7e5e4" strokeWidth="1" strokeDasharray="4 4"
      />
      <line
        x1={CHART / 2} y1={PAD}
        x2={CHART / 2} y2={CHART - PAD}
        stroke="#e7e5e4" strokeWidth="1" strokeDasharray="4 4"
      />

      {/* X axis labels */}
      <text x={PAD} y={PAD - 8} fontSize="9" fill="#a8a29e" fontFamily="sans-serif">
        bold / bittersweet
      </text>
      <text
        x={CHART - PAD} y={PAD - 8}
        fontSize="9" fill="#a8a29e" textAnchor="end" fontFamily="sans-serif"
      >
        floral / fruity
      </text>

      {/* Y axis labels */}
      <text
        x={CHART - PAD + 4} y={PAD + 3}
        fontSize="9" fill="#a8a29e" fontFamily="sans-serif"
      >
        light
      </text>
      <text
        x={CHART - PAD + 4} y={CHART - PAD + 3}
        fontSize="9" fill="#a8a29e" fontFamily="sans-serif"
      >
        dark
      </text>

      {/* Product dots */}
      {products.filter((p) => p.tastingNote).map((p) => {
        const cx = PAD + (p.tastingNote!.x / 100) * PLOT;
        const cy = PAD + (p.tastingNote!.y / 100) * PLOT;
        const isCurrent = p.id === currentId;

        return (
          <g key={p.id}>
            {isCurrent && (
              <circle cx={cx} cy={cy} r={10} fill="#292524" fillOpacity="0.12" />
            )}
            <circle
              cx={cx} cy={cy}
              r={isCurrent ? 5 : 4}
              fill={isCurrent ? "#292524" : "#a8a29e"}
            />
            <text
              x={cx} y={cy + 14}
              fontSize="8" fill={isCurrent ? "#292524" : "#78716c"}
              textAnchor="middle" fontFamily="sans-serif"
              fontWeight={isCurrent ? "600" : "400"}
            >
              {p.name.length > 8 ? p.name.slice(0, 8) + "…" : p.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function TastingNoteSection({
  products,
  currentId,
}: {
  products: ProductDetail[];
  currentId: number;
}) {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex gap-16 items-start">
          {/* Left: Text */}
          <div className="flex-1 pt-2">
            <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-4">
              테이스팅 노트
            </p>
            <h2 className="text-2xl font-bold text-stone-900 mb-6 leading-snug">
              당신의 커피 취향을
              <br />
              찾아보세요
            </h2>
            <div className="space-y-4 text-stone-500 text-sm leading-relaxed">
              <p>
                코지커피는 커피 플레이버를 설명할 때, 단순한 맛 이상의 감각적 경험을 전달하고자 노력합니다. 테이스팅 노트는 커피의 당도, 산도, 바디감, 여운, 향미 등 다섯 가지 요소를 중심으로 구성되며, 이를 통해 각 커피의 독특한 특성을 표현하고 이해하는 데 사용됩니다.
              </p>
              <p>
                코지커피의 원두를 로스팅 레벨과 플레이버로 나누어 한눈에 정리했습니다. 차트를 참고해 나만의 취향을 찾아보세요.
              </p>
            </div>
          </div>

          {/* Right: Chart */}
          <div className="w-80 flex-none flex items-center justify-center">
            <TastingChart products={products} currentId={currentId} />
          </div>
        </div>
      </div>
    </section>
  );
}
