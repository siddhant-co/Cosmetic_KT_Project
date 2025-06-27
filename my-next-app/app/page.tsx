
import BannerServer from "@/components/Banner/BannerServer";
import { fetchBanners } from "./function";
import CategorySection from "@/components/CategorySection/CategorySection";
import HotListWrapper from "@/components/HotList/HotListWrapper";
import TestProductCard from "@/components/ProductCard/TestProductCard";
import TestimonialsSection from "@/components/TestimonialsSection/TestimonialsSection";
import TopCategories from "@/components/TopCategories/TopCategories";






export default async function HomePage() {
  const banners = await fetchBanners(); // Server-side

  return (
    <div  className="pt-[50px]">
   
      <BannerServer banners={banners} />
      <CategorySection />
      <HotListWrapper />
      <TestProductCard></TestProductCard>
      <TopCategories/>
      <TestimonialsSection />
    </div>
  );
}

