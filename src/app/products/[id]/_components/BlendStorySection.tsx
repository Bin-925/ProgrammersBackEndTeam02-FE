import type { ProductDetail } from "../types";

export default function BlendStorySection({
  name,
  story,
  thumbnailUrl,
}: {
  name: string;
  story: ProductDetail["blendStory"];
  thumbnailUrl: string;
}) {
  const paragraphs = story.content.split("\n\n");

  return (
    <section className="bg-stone-50 py-16">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex gap-16 items-start">
          {/* Left: Image */}
          <div className="w-80 flex-none">
            <div className="aspect-square rounded-2xl bg-stone-200 overflow-hidden flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnailUrl}
                alt={name}
                className="w-full h-full object-contain p-10"
              />
            </div>
          </div>

          {/* Right: Story */}
          <div className="flex-1 pt-2">
            <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-4">
              블렌드 스토리
            </p>
            <h2 className="text-2xl font-bold text-stone-900 mb-6">{name}</h2>
            <div className="space-y-4">
              {paragraphs.map((para, i) => (
                <p key={i} className="text-stone-500 leading-relaxed text-sm">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
