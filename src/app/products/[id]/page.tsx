import { notFound } from "next/navigation";
import { productDetails } from "./data";
import type { ProductDetail } from "./types";
import { mapApiProductToCustomer, type ApiProduct } from "../../../lib/productMapper";
import Navbar from "../../customer/_components/Navbar";
import Footer from "../../customer/_components/Footer";
import ProductHero from "./_components/ProductHero";
import CupNoteSection from "./_components/CupNoteSection";
import FlavorProfileSection from "./_components/FlavorProfileSection";
import BlendStorySection from "./_components/BlendStorySection";
import TastingNoteSection from "./_components/TastingNoteSection";
import FadeInSection from "./_components/FadeInSection";

async function fetchProduct(id: number): Promise<ProductDetail | null> {
  try {
    const res = await fetch(
      `https://be-production-9ee1.up.railway.app/api/products/${id}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data: ApiProduct = await res.json();
    const base = mapApiProductToCustomer(data);
    const richContent = productDetails.find((p) => p.name === data.productName);
    return {
      ...base,
      shortDescription: richContent?.shortDescription ?? base.shortDescription,
      cupNote: richContent?.cupNote,
      flavorProfile: richContent?.flavorProfile,
      blendStory: richContent?.blendStory,
      tastingNote: richContent?.tastingNote,
      award: richContent?.award,
    };
  } catch {
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProduct(Number(id));
  if (!product) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <FadeInSection>
          <ProductHero product={product} />
        </FadeInSection>
        {product.cupNote && (
          <FadeInSection>
            <CupNoteSection cupNote={product.cupNote} />
          </FadeInSection>
        )}
        {product.flavorProfile && (
          <FadeInSection>
            <FlavorProfileSection flavorProfile={product.flavorProfile} />
          </FadeInSection>
        )}
        {product.blendStory && (
          <FadeInSection>
            <BlendStorySection
              name={product.name}
              story={product.blendStory}
              thumbnailUrl={product.thumbnailUrl}
            />
          </FadeInSection>
        )}
        {product.tastingNote && (
          <FadeInSection>
            <TastingNoteSection products={productDetails} currentId={product.id} />
          </FadeInSection>
        )}
      </main>
      <Footer />
    </>
  );
}
