import Navbar from "./customer/_components/Navbar";
import HeroSection from "./customer/_components/HeroSection";
import WhySection from "./customer/_components/WhySection";
import ProductList from "./customer/_components/ProductList";
import Footer from "./customer/_components/Footer";
import { products } from "./customer/data";

export default function RootPage() {
  return (
    <>
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
