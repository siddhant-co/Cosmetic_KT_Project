import { BannerType } from "@/types/banner";
import BannerSlider from "@/components/ClientsideComponent/BannerSlider/BannerSlider";

export const getBanners = async (): Promise<BannerType[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/banners`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) throw new Error("Banner fetch failed");

    const banners: BannerType[] = await response.json();
    return banners;
  } catch (error) {
    console.error("Banner API error:", error);
    return [];
  }
};

const HeroBanner = async () => {
  const banners = await getBanners();

  const active = banners
    .filter((b) => b.isActive)
    .sort((a, b) => a.sequence_number - b.sequence_number);

  if (!active.length) return null;

  return <BannerSlider banners={active} />;
};

export default HeroBanner;
