import CategorySection from "@/components/CategorySection/CategorySection";
import HotListWrapper from "@/components/HotList/HotListWrapper";
import FeaturesBanner from "@/components/ServersideComponent/FeaturesBanner/FeaturesBanner";
import Footer from "@/components/ServersideComponent/Footer/Footer";
import HeroBanner from "@/components/ServersideComponent/HeroBanner/HeroBanner";
import WhyChooseUs from "@/components/ServersideComponent/WhyChooseUs/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection/TestimonialsSection";
import TopCategories from "@/components/TopCategories/TopCategories";

export default async function HomePage() {
  return (
    <div>
      <HeroBanner />
      <CategorySection />
      <HotListWrapper />
      <TopCategories />
      <WhyChooseUs />
      <TestimonialsSection />
      <FeaturesBanner />
      <Footer />
    </div>
  );
}
