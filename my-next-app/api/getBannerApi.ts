import { apiCore } from "@/api/ApiCore";
import { BannerType } from "@/types/banner";

// Optional: Define response type if the API returns { data: BannerType[] }
type BannerApiResponse = BannerType[] | { data: BannerType[] };

export const getBanners = async (): Promise<BannerType[]> => {
  try {
    const res = await apiCore<BannerApiResponse>("/frontend/banners", "GET");

    // If response is directly an array
    if (Array.isArray(res)) {
      return res;
    }

    // If response is an object with a 'data' field
    return res?.data || [];
  } catch (err: any) {
    if (err.message.includes("API error 404")) {
      console.warn("Banner endpoint not found, fallback to empty array");
      return [];
    }
    throw err;
  }
};
