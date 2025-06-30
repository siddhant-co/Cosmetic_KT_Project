

// 'use client';

import ProductCard from "@/components/CommonComponents/ProductCard/ProductCard";
import { Category } from "@/types/category";
import { Product } from "@/types/product";






// import Image from "next/image";


// interface CategoryInfoProps {
//   category: Category;
//   products: Product[];
// }

// export default function CategoryInfo({ category, products }: CategoryInfoProps) {
//   return (
//     <div className="px-4 py-8 max-w-screen-xl mx-auto">
//       {/* Category Banner */}
//       {category.banner && (
//         <div className="mb-8 relative  h-[300px] lg:h-[320px] rounded-2xl overflow-hidden shadow-lg">
//           <Image
//             src={category.banner}
//             alt={category.name}
//             fill
//             className="object-cover w-full h-full"
//             priority
//           />
//         </div>
//       )}

//       {/* Category Name */}
//       <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800 tracking-wide">
//         {category.name}
//       </h1>

//       {/* Products */}
//       {products.length === 0 ? (
//         <div className="text-center text-gray-500 text-lg py-12">
//           <p>No products found in this category.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="transition-transform transform hover:scale-[1.02]"
//             >
//               <ProductCard product={product} />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



import Image from 'next/image';


interface Props {
  category: Category;
  products: Product[];
}

export default function CategoryInfo({ category, products }: Props) {
  return (
    <div className="w-full">
      {/* Banner */}
      <div className="relative w-full h-[350px] lg:h-[290px]">
        {category.banner ? (
          <Image
            src={category.banner}
            alt={category.name}
            fill
            className="object-contain h-[300px] w-full"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            No Banner Available
          </div>
        )}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center" />
      </div>

      {/* Description */}
      <div className="w-full px-4 py-6 mt-3 mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-orange-100 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-orange-100 rounded-full opacity-30 translate-x-1/2 translate-y-1/2"></div>

          <h2 className="text-2xl font-semibold text-orange-600 mb-4">{category.name}</h2>
          <p className="text-gray-700 leading-relaxed">
            {/* Optional description or SEO content */}
          </p>
        </div>
      </div>

      <h3 className="px-4 py-6 text-xl font-semibold">All Products / {category.name}</h3>

      {/* Product Grid */}
      <div className="px-4 pb-12">
        {products.length === 0 ? (
          <div className="bg-white border p-6 rounded shadow text-center text-gray-500">
            No products found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
