

import { Category } from "@/types/category";

export interface GetCategoriesResponse {
  success: boolean;
  categories: Category[];
}



export const fetchCategories = async (): Promise<GetCategoriesResponse> => {
  try {
    const response = await fetch("https://ecom-testing.up.railway.app/category");
    
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();
    return data as GetCategoriesResponse;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};