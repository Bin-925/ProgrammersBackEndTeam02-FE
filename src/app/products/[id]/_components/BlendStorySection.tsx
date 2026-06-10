import type { BlendStory } from "../types";

export default function BlendStorySection({
  name,
  story,
  thumbnailUrl,
}: {
  name: string;
  story: BlendStory;
  thumbnailUrl: string;
}) {
  const paragraphs = story.content.split("\n\n");

  return (
    <section className="bg-stone-50 py-8 sm:py-16 dark:bg-stone-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-start">
          {/* Image */}
          <div className="w-full sm:w-80 sm:flex-none">
            <div className="aspect-square rounded-2xl bg-stone-200 overflow-hidden flex items-center justify-center dark:bg-stone-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnailUrl}
                alt={name}
                className="w-full h-full object-contain p-10"
              />
            </div>
          </div>

          {/* Story */}
          <div className="flex-1">
            <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-4 dark:text-stone-500">
              블렌드 스토리
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-4 sm:mb-6 dark:text-white">{name}</h2>
            <div className="space-y-4">
              {paragraphs.map((para, i) => (
                <p key={i} className="text-stone-500 leading-relaxed text-sm dark:text-stone-400">
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
