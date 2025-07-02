import { BannerType } from "@/types/banner";
import BannerSlider from "@/components/ClientsideComponent/BannerSlider/BannerSlider";
import { apiCore } from "@/api/ApiCore";

type BannerApiResponse = {
  data: BannerType[];
};

const getBanners = async (): Promise<BannerType[]> => {
  try {
    const res = await apiCore<BannerApiResponse>("/banners", "GET");
    return res.data || [];
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("API error 404")) {
      console.warn("Banner endpoint not found, fallback to empty array");
      return [];
    }
    console.error(
      "Banner API error:",
      err instanceof Error ? err.message : err
    );
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
