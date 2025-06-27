// api/getBanners.ts
import { apiCore } from "@/api/ApiCore";

export const getBanners = async () => {
  try {
    const res = await apiCore("/banners", "GET");
    return Array.isArray(res) ? res : res?.data || [];
  } catch (error) {
    console.error("❌ Failed to fetch banners:", error);
    return [];
  }
};
