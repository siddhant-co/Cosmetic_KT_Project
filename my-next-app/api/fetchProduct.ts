// lib/api/products.ts

import { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://ecom-testing.up.railway.app/product?page=1&limit=100', {
    cache: 'no-store', // disable caching for SSR
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await res.json();
  return data.products;


}

