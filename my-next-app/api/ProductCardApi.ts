import { ReactNode } from "react";

export interface Variant {
  Price: any;
  specification: any;
  basePrice: number;
  id: number;
  name: string;
  price: number;
  stock: number;
  images: { url: string }[];
  variantId:number
}

export interface Category {
  id: number;
  name: string;
}

export interface Subcategory {
  slug: any;
  id: number;
  name: string;
  categoryId: number;
}

export interface Product {
  image: string;
  type: any;
  category_name: ReactNode;
  category_slug: string;
  productSlug: any;
  images: any;
  stock: any;
  price: any;
  id: number;
  productId: number;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  oldPrice: number;
  sellingPrice: number;
  imageUrl: string;
  tags: string[];
  category: Category;
  subcategory: Subcategory;
  variants: Variant[];
  productVariants: Variant[];
}

export async function fetchProducts(page: number = 1, limit: number = 10): Promise<Product[]> {
  try {
    const res = await fetch(`https://ecom-testing.up.railway.app/product?page=${page}&limit=${limit}`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    if (!data?.data || !Array.isArray(data.data)) {
      console.warn('Expected product data to be an array, got:', data);
      return [];
    }

    return data.data as Product[]; // Type assertion for safety
  } catch (error: unknown) {
    console.error('Failed to fetch products:', (error as Error).message);
    return [];
  }
}
