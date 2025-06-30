import CategorySection from "@/components/CategorySection/CategorySection";
import FeaturesBanner from "@/components/ServersideComponent/FeaturesBanner/FeaturesBanner";
import Footer from "@/components/ServersideComponent/Footer/Footer";
import HeroBanner from "@/components/ServersideComponent/HeroBanner/HeroBanner";
import WhyChooseUs from "@/components/ServersideComponent/WhyChooseUs/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection/TestimonialsSection";
import TopCategories from "@/components/TopCategories/TopCategories";
import { fetchProducts } from "@/api/fetchProduct";
import ProductServer from "@/components/ServersideComponent/ProductServer/ProductServer";

import FeaturedSliderComponent from "@/components/ServersideComponent/FeaturedSliderComponent/FeaturedSliderComponent";
import GalleryPage from "@/components/ServersideComponent/GalleryPage/GalleryPage";


export default async function HomePage() {
  const { products } = await fetchProducts();

  return (
    <div>
      <HeroBanner />
      <CategorySection />
      <TopCategories />
      <ProductServer />
      <WhyChooseUs /> 
      <FeaturedSliderComponent />
      <TestimonialsSection />
      <GalleryPage />
      <FeaturesBanner />
      <Footer />
    </div>
  );
}
