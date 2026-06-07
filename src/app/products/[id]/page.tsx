import { notFound } from "next/navigation";
import { productDetails } from "./data";
import Navbar from "../../customer/_components/Navbar";
import Footer from "../../customer/_components/Footer";
import ProductHero from "./_components/ProductHero";
import CupNoteSection from "./_components/CupNoteSection";
import FlavorProfileSection from "./_components/FlavorProfileSection";
import BlendStorySection from "./_components/BlendStorySection";
import TastingNoteSection from "./_components/TastingNoteSection";
import FadeInSection from "./_components/FadeInSection";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = productDetails.find((p) => p.id === Number(id));
  if (!product) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <FadeInSection>
          <ProductHero product={product} />
        </FadeInSection>
        <FadeInSection>
          <CupNoteSection cupNote={product.cupNote} />
        </FadeInSection>
        <FadeInSection>
          <FlavorProfileSection flavorProfile={product.flavorProfile} />
        </FadeInSection>
        <FadeInSection>
          <BlendStorySection
            name={product.name}
            story={product.blendStory}
            thumbnailUrl={product.thumbnailUrl}
          />
        </FadeInSection>
        <FadeInSection>
          <TastingNoteSection products={productDetails} currentId={product.id} />
        </FadeInSection>
      </main>
      <Footer />
    </>
  );
}
