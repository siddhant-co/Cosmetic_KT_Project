// src/types/cart.ts

export interface CartItem {
  cartItemId: number; // Unique ID for this specific item *within the user's cart* (assigned by backend)
  id: number; // The original Product ID
  name: string;
  quantity: number;
  sellingPrice: number;
  basePrice: number;
  image: string;
  variantId?: number; // Optional, for products with variations
}