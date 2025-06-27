import { fetchBanners } from "./function";
import CategorySection from "@/components/CategorySection/CategorySection";
import HotListWrapper from "@/components/HotList/HotListWrapper";
import TestProductCard from "@/components/ProductCard/TestProductCard";
import FeaturesBanner from "@/components/ServersideComponent/FeaturesBanner/FeaturesBanner";
import Footer from "@/components/ServersideComponent/Footer/Footer";
import HeroBanner from "@/components/ServersideComponent/HeroBanner/HeroBanner";
import TestimonialsSection from "@/components/TestimonialsSection/TestimonialsSection";
import TopCategories from "@/components/TopCategories/TopCategories";

export default async function HomePage() {
  const banners = await fetchBanners(); // Server-side

  return (
    <div>
      <HeroBanner />
      <CategorySection />
      <HotListWrapper />
      <TestProductCard></TestProductCard>
      <TopCategories />
      <TestimonialsSection />
      <FeaturesBanner />
      <Footer />
    </div>
  );
}
