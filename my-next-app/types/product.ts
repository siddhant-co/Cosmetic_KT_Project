// types/product.ts

import { ReactNode } from "react";

export type ProductImage = {
  image: string;
};

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
export type ProductCategory = {
  name: string;
};

export type Product = {
  description: ReactNode;
  id: number;
  name: string;
  slug: string;
  basePrice: string;
  sellingPrice: string;
  priceDifferencePercent: number;
  category: ProductCategory;
  images: ProductImage[];
  variants: Variant[];
};
