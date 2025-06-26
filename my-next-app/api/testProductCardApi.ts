// VariantImage interface
export interface VariantImage {
  id: number;
  url: string;
  variantId: number;
}

// Specification interface
export interface Specification {
  type: string;
}

// Variant interface
export interface Variant {
  Price: any;
  id: number;
  description: string;
  specification: Specification;
  price: number; // 👈 capital "P" matches your actual JSON
  stock: number;
  productId: number;
  images: VariantImage[];
  name: string;
  basePrice:number
}

// Category interface
export interface Category {
  id: number;
  name: string;
  parentId: number | null;
  image: string;
}

// Product interface
export interface Products {
  image: string;
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  userId: number;
  stock: number;
  is_new_arrival: boolean;
  is_active: boolean;
  tags: string[];
  slug: string;
  description: string;
  type: string;
  categories: Category[];
  variants: Variant[];
}
