// components/ClientsideComponent/ProductCard/ProductCard.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import CartButton from "@/components/CommonComponents/CartButton/CartButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { addToCart } from "@/store/slices/cartSlice"; // For guest cart
import { selectToken } from "@/store/slices/authSlice";
import { useLoggedInCart } from "@/Providers/LoggedInCartContext";
import { CartItem } from "@/types/cart"; // Import CartItem from central location

interface ProductImage {
  image: string;
  sequence: number;
}

interface Product {
  id: number;
  name: string;
  sellingPrice: string;
  basePrice: string;
  images: ProductImage[];
  variantId?: number;
}

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const firstImage = product.images.find((img) => img.sequence === 1)?.image;
  const secondImage = product.images.find((img) => img.sequence === 2)?.image;

  const [hovered, setHovered] = useState(false);
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  const loggedInCart = useLoggedInCart();

  const handleAddToCart = async (product: Product) => {
    // Construct the item *without* cartItemId, as it's assigned by the backend
    const itemForAPI: Omit<CartItem, "cartItemId"> = {
      id: product.id, // This is the productId
      name: product.name,
      quantity: 1, // Always add one at a time from this button
      sellingPrice: parseFloat(product.sellingPrice),
      basePrice: parseFloat(product.basePrice),
      image: firstImage || "/placeholder.jpg",
      variantId: product.variantId,
    };

    if (token) {
      console.log(
        "ProductCard: Logged-in user initiating add with item data:",
        itemForAPI
      );
      // Pass the item without cartItemId; the provider handles the temporary ID and refetch.
      await loggedInCart.addCartItem(itemForAPI);
      console.log(
        "ProductCard: Logged-in addCartItem call finished and UI optimistically updated."
      );
    } else {
      console.log(
        "ProductCard: Guest user adding product to Redux cart with item data:",
        itemForAPI
      );
      // For the Redux store (guest cart), if your Redux CartItem type requires `cartItemId`,
      // you'll need to generate a temporary one here before dispatching.
      // Example for Redux:
      const guestCartItem: CartItem = {
        ...itemForAPI,
        cartItemId: Date.now() * -1, // Use a temporary, unique negative ID for guest cart
      };
      dispatch(addToCart(guestCartItem));
    }
  };

  return (
    <div className="group relative w-full max-w-[250px] mx-auto rounded-lg overflow-hidden shadow-md border border-pink-100 bg-white/70 backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:scale-[1.015]">
      <div className="relative z-10 pb-4">
        <div
          className="bg-[#F3F6F7] px-3 pt-3 pb-2 rounded-t-lg"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="overflow-hidden rounded-md h-[130px] flex justify-center items-center">
            <Image
              src={
                hovered && secondImage
                  ? secondImage
                  : firstImage || "/placeholder.jpg"
              }
              alt={product.name}
              width={160}
              height={160}
              className={`object-contain transition-transform duration-500 ${
                hovered && secondImage ? "scale-110" : "scale-100"
              }`}
            />
          </div>
        </div>

        <h3 className="mt-2 px-3 text-sm font-semibold text-center text-pink-800 line-clamp-2">
          {product.name}
        </h3>

        <div className="mt-1 flex justify-center gap-2 items-center">
          <span className="text-base font-bold text-pink-600">
            ₹{product.sellingPrice}
          </span>
          <span className="text-xs text-gray-500 line-through">
            ₹{product.basePrice}
          </span>
        </div>

        <div className="mt-3 flex justify-center px-3">
          <CartButton onClick={() => handleAddToCart(product)} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
