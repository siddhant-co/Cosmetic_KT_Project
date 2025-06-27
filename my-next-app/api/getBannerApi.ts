// api/getBannerApi.ts
import { apiCore } from "./ApiCore";
import { BannerType } from "@/types/banner";

export const getBanners = async (): Promise<BannerType[]> => {
  try {
    const res = await apiCore("/frontend/banners", "GET");
    return Array.isArray(res) ? res : res?.data || [];
  } catch (err: any) {
    // If it's a 404, return an empty array to avoid breaking
    if (err.message.includes("API error 404")) {
      console.warn("Banner endpoint not found, fallback to empty array");
      return [];
    }
    throw err;  // Let other errors surface
  }
};
