"use client";

import { useState } from "react";
import Image from "next/image";
import CartButton from "@/components/CommonComponents/CartButton/CartButton";
import { Product } from "@/types/product";

// interface ProductImage {
//   image: string;
//   sequence: number;
// }

// interface Product {
//   id: number;
//   name: string;
//   sellingPrice: string;
//   basePrice: string;
//   images: ProductImage[];
// }

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const firstImage = product.images.find((img) => img.sequence === 1)?.image;
  const secondImage = product.images.find((img) => img.sequence === 2)?.image;

  const [hovered, setHovered] = useState(false);

  return (
    <div className="group relative w-full max-w-[250px] mx-auto rounded-lg overflow-hidden shadow-md border border-pink-100 bg-white/70 backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:scale-[1.015]">
      <div className="relative z-10 pb-4">
        {/* 🖼️ Image section with hover effect */}
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

        {/* 🏷️ Title */}
        <h3 className="mt-2 px-3 text-sm font-semibold text-center text-pink-800 line-clamp-2">
          {product.name}
        </h3>

        {/* 💰 Price */}
        <div className="mt-1 flex justify-center gap-2 items-center">
          <span className="text-base font-bold text-pink-600">
            ₹{product.sellingPrice}
          </span>
          <span className="text-xs text-gray-500 line-through">
            ₹{product.basePrice}
          </span>
        </div>

        {/* 🛒 Cart Button */}
        <div className="mt-3 flex justify-center px-3">
          <CartButton onClick={() => console.log("Add to cart", product.id)} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
