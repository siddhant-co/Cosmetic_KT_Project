import { ReactNode } from "react";

export interface ProductImage {
  id: number;
  image: string;
  sequence: number;
  productId: number;
}

export interface ProductVariant {
  image: string;
}

export interface ProductCategory {
  products: any;
  id: number;
  name: string;
  imageUrl: string;
  banner: string;
}

export interface VariantImage {
  url: string;
}
export interface Variant {
  id: number;
  name?: string;
  price?: number;
  basePrice?: number;
  images?: VariantImage[];
}


export interface Product {
  description: string;
  categoryId: number;
  id: number;
  name: string;
  basePrice: string;
  sellingPrice: string;
  images: ProductImage[];
  variants?: Variant[]
  category: ProductCategory;
  slug: string;
}
