// components/HeroBanner.tsx
import { getBanners } from "@/api/getBannerApi";
import BannerSlider from "@/components/ClientsideComponent/BannerSlider/BannerSlider";

const HeroBanner = async () => {
  const banners = await getBanners();

  const activeBanners = (banners || [])
    .filter((b: any) => b.isActive)
    .sort((a: any, b: any) => a.sequence_number - b.sequence_number);

  if (activeBanners.length === 0) return null;

  return <BannerSlider banners={activeBanners} />;
};

export default HeroBanner;
