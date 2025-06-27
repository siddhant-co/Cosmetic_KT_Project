// types/product.ts
export interface Product {
  id: number | string; // 👈 must be included to fix this error
  title: string;
  image: string;
  rating: number;
  reviews: number;
  mrp: number;
  price: number;
  discount: string;
}
