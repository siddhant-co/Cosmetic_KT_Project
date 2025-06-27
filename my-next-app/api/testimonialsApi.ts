// api/ProductCardApi.ts

import { Product } from "@/types/product";

export async function fetchProducts(page: number, limit: number): Promise<Product[]> {
  // Simulated product data for testing (you can replace with actual API call)
  const sampleProducts: Product[] = Array.from({ length: limit }, (_, i) => ({
    id: i + 1,
    title: `Test Product ${i + 1}`,
    image: "/sample-product.jpg",
    rating: 4.5,
    reviews: 120,
    mrp: 999,
    price: 699,
    discount: "30%",
  }));

  return sampleProducts;
}
