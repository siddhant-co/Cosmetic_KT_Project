import CategorySection from "@/components/CategorySection/CategorySection";
import FeaturesBanner from "@/components/ServersideComponent/FeaturesBanner/FeaturesBanner";
import Footer from "@/components/ServersideComponent/Footer/Footer";
import HeroBanner from "@/components/ServersideComponent/HeroBanner/HeroBanner";
import WhyChooseUs from "@/components/ServersideComponent/WhyChooseUs/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection/TestimonialsSection";
import TopCategories from "@/components/TopCategories/TopCategories";
import ProductServer from "@/components/ServersideComponent/ProductServer/ProductServer";

export default async function HomePage() {

  return (
    <div>
      <HeroBanner />
      <CategorySection />
      <TopCategories />

      {/* ✅ Products Section */}
      <ProductServer />
      <WhyChooseUs />
      <TestimonialsSection />
      <FeaturesBanner />
      <Footer />
    </div>
  );
}
