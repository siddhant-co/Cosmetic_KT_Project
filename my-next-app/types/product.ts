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
  id: number;
  name: string;
  imageUrl: string;
  banner: string;
}

export interface Product {
  id: number;
  name: string;
  basePrice: string;
  sellingPrice: string;
  images: ProductImage[];
  variants: ProductVariant[];
  category: ProductCategory;
}
