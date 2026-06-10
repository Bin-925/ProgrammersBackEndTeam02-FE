import Navbar from "./customer/_components/Navbar";
import HeroSection from "./customer/_components/HeroSection";
import WhySection from "./customer/_components/WhySection";
import ProductList from "./customer/_components/ProductList";
import Footer from "./customer/_components/Footer";
import EventPopup from "./customer/_components/EventPopup";
import { mapApiProductToCustomer, type ApiProduct } from "../lib/productMapper";
import { products as fallbackProducts } from "./customer/data";

async function fetchProducts() {
  try {
    const res = await fetch("https://be-production-9ee1.up.railway.app/api/products", {
      next: { revalidate: 60 },
    });
    if (!res.ok) return fallbackProducts;
    const data: ApiProduct[] = await res.json();
    return data.map(mapApiProductToCustomer);
  } catch {
    return fallbackProducts;
  }
}

export default async function RootPage() {
  const products = await fetchProducts();

  return (
    <>
      <EventPopup />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <WhySection />
        <ProductList products={products} />
      </main>
      <Footer />
    </>
  );
}
