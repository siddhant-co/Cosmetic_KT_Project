import CategorySection from "@/components/CategorySection/CategorySection";
import HotListWrapper from "@/components/HotList/HotListWrapper";
import TestProductCard from "@/components/ProductCard/TestProductCard";
import FeaturesBanner from "@/components/ServersideComponent/FeaturesBanner/FeaturesBanner";
import Footer from "@/components/ServersideComponent/Footer/Footer";
import HeroBanner from "@/components/ServersideComponent/HeroBanner/HeroBanner";
import TestimonialSection from "@/components/ServersideComponent/TestimonialSection/TestimonialSection";
import WhyChooseUs from "@/components/ServersideComponent/WhyChooseUs/WhyChooseUs";





import TopCategories from "@/components/TopCategories/TopCategories";

export default async function HomePage() {
  return (
    <div>
      <HeroBanner />
      <CategorySection />
      <HotListWrapper />
      <TestProductCard></TestProductCard>
      <TopCategories />
       <WhyChooseUs/>
      <TestimonialSection />
      <FeaturesBanner />
      <Footer />
    </div>
  );
}
