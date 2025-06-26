// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';
// import { Product, Variant } from '@/api/ProductCardApi';
// import Link from 'next/link';

// interface Props {
//   product: Product;
// }

// const ProductCard: React.FC<Props> = ({ product }) => {
//   const initialVariant: Variant =
//     product.variants?.[0] || {
//       ...product,
//       variantId: product.id,
//       basePrice: product.basePrice,
//       price: product.sellingPrice,
//       images: [{ url: product.imageUrl }],
//       stock: product.stock,
//       name: product.name,
//       id: product.id,
//     };

//   const [selectedVariant, setSelectedVariant] = useState<Variant>(initialVariant);

//   const discount = Math.round(
//     ((selectedVariant.basePrice - selectedVariant.price) / selectedVariant.basePrice) * 100
//   );

//   const handleAddToCart = () => {
//     console.log('Add to cart:', {
//       productId: product.id,
//       variantId: selectedVariant.variantId,
//     });
//   };

//   const handleWishlist = () => {
//     console.log('Add to wishlist:', {
//       productId: product.id,
//     });
//   };

//   return (
 
//     <div className="border border-gray-300 rounded-md p-3 shadow-md hover:shadow-lg transition flex flex-col cursor-pointer">
//       <div className="relative w-full h-48 mb-3">
//         <Image
//           src={selectedVariant.images?.[0]?.url || product.imageUrl}
//           alt={product.name}
//           fill
//           className="object-contain"
//         />
//       </div>

//       <h3 className="font-semibold text-sm truncate mb-1 ">{product.name}</h3>

//       <div className="text-yellow-500 text-md mb-1">
//         ★★★★☆ ({Math.floor(Math.random() * 300) + 10})
//       </div>

//       <div className="text-sm mb-1">
//         <span className="line-through text-gray-400 mr-1">₹{selectedVariant.basePrice}</span>
//         <span className="font-semibold text-black">₹{selectedVariant.price}</span>
//       </div>

 

//       {Array.isArray(product.variants) && product.variants.length > 1 && (
//         <div className="flex flex-wrap gap-2 mb-2">
//           {product.variants.map((variant) => (
//             <button
//               key={variant.id}
//               className={`px-2 py-1 text-xs rounded border ${
//                 variant.id === selectedVariant.id ? 'bg-purple-600 text-white' : 'bg-white text-gray-800'
//               }`}
//               onClick={() => setSelectedVariant(variant)}
//             >
//               {variant.name}
//             </button>
//           ))}
//         </div>
//       )}

//       <button
//         onClick={handleAddToCart}
//         className="mt-auto w-full bg-purple-600 text-white text-sm py-1.5 rounded hover:bg-purple-700 transition"
//       >
//         Add to Bag
//       </button>

//       <div
//         className="text-center text-xs text-gray-500 mt-1 cursor-pointer hover:underline"
//         onClick={handleWishlist}
//       >
//         ♡ Add to wishlist
//       </div>
//       </div>

//   );
// };

// export default ProductCard;



'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Products as Product, Variant } from '@/api/testProductCardApi';

interface Props {
  product: Product;

}

const ProductCard: React.FC<Props> = ({ product }) => {
  const initialVariant: Variant = product.variants?.[0];
  const [selectedVariant, setSelectedVariant] = useState<Variant>(initialVariant);

  const basePrice = product.price;
  const sellingPrice = selectedVariant?.Price; // Match your actual data: "Price" (capital P)
  const discount =
    basePrice && sellingPrice
      ? Math.round(((basePrice - sellingPrice) / basePrice) * 100)
      : 0;

  const handleAddToCart = () => {
    console.log('Add to cart:', {
      productId: product.id,
      variantId: selectedVariant?.id,
    });
  };

  const handleWishlist = () => {
    console.log('Add to wishlist:', {
      productId: product.id,
    });
  };

  return (
    <div className="border border-gray-300 rounded-md p-3 shadow-md hover:shadow-lg transition flex flex-col cursor-pointer">
      <div className="relative w-full h-48 mb-3">
        <Image
          src={
            selectedVariant?.images?.[0]?.url ||
            product.image // fallback to product.image
          }
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>

      <h3 className="font-semibold text-sm truncate mb-1">{product.name}</h3>

      <div className="text-yellow-500 text-md mb-1">
        ★★★★☆ ({Math.floor(Math.random() * 300) + 10})
      </div>

      <div className="text-sm mb-1">
        <span className="line-through text-gray-400 mr-1">₹{basePrice}</span>
        <span className="font-semibold text-black">₹{sellingPrice}</span>
        {discount > 0 && (
          <span className="ml-2 text-green-600 text-xs">({discount}% OFF)</span>
        )}
      </div>

      {Array.isArray(product.variants) && product.variants.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {product.variants.map((variant, index) => (
            <button
              key={variant.id}
              className={`px-2 py-1 text-xs rounded border ${
                variant.id === selectedVariant?.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-800'
              }`}
              onClick={() => setSelectedVariant(variant)}
            >
              {variant.specification?.type.trim() || `Variant ${index + 1}`}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={handleAddToCart}
        className="mt-auto w-full bg-purple-600 text-white text-sm py-1.5 rounded hover:bg-purple-700 transition"
      >
        Add to Bag
      </button>

      <div
        className="text-center text-xs text-gray-500 mt-1 cursor-pointer hover:underline"
        onClick={handleWishlist}
      >
        ♡ Add to wishlist
      </div>
    </div>
  );
};

export default ProductCard;
