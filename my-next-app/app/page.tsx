import CategorySection from "@/components/CategorySection/CategorySection";
import FeaturesBanner from "@/components/ServersideComponent/FeaturesBanner/FeaturesBanner";
import Footer from "@/components/ServersideComponent/Footer/Footer";
import HeroBanner from "@/components/ServersideComponent/HeroBanner/HeroBanner";
import WhyChooseUs from "@/components/ServersideComponent/WhyChooseUs/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection/TestimonialsSection";
import TopCategories from "@/components/TopCategories/TopCategories";

import { fetchProducts } from "@/api/fetchProduct";
import ProductCard from "@/components/CommonComponents/ProductCard/ProductCard";

export default async function HomePage() {
  const { products } = await fetchProducts();

  return (
    <div>
      <HeroBanner />
      <CategorySection />
      <TopCategories />

      {/* ✅ Products Section */}
      <section className="px-4 py-10">
        <h2 className="text-2xl font-bold text-center mb-6">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <WhyChooseUs />
      <TestimonialsSection />
      <FeaturesBanner />
      <Footer />
    </div>
  );
}
