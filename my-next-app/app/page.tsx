import { fetchBanners } from "./function";
import CategorySection from "@/components/CategorySection/CategorySection";
import HotListWrapper from "@/components/HotList/HotListWrapper";
import TestProductCard from "@/components/ProductCard/TestProductCard";
import TestimonialsSection from "@/components/TestimonialsSection/TestimonialsSection";
import TopCategories from "@/components/TopCategories/TopCategories";
import FeaturesBanner from "@/components/ServersideComponent/FeaturesBanner/FeaturesBanner";
import HeroBanner from "@/components/ServersideComponent/HeroBanner/HeroBanner";

export default async function HomePage() {
  const banners = await fetchBanners(); // Server-side

  return (
    <div className="pt-[50px]">
      <HeroBanner />
      <CategorySection />
      <HotListWrapper />
      <TestProductCard></TestProductCard>
      <TopCategories />
      <TestimonialsSection />
      <FeaturesBanner />
    </div>
  );
}
