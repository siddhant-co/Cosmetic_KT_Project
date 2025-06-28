// import Image from "next/image";


// interface Category {
//   id: number;
//   name: string;
//   banner: string | null;
//   imageUrl: string | null;
//   subcategories: any[];
// }

// interface Props {
//   category: Category;
// }

// export default function CategoryInfo({ category }: Props) {


  
//   return (
//     <div className="w-full">

//       <div className="relative w-full h-[350px] lg:h[290px]">
//         {category.banner ? (
//           <Image
//             src={category.banner}
//             alt={category.name}
//             fill
//             className="object-contain h-full w-full"
//             priority
//           />
//         ) : (
//           <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//             No Banner Available
//           </div>
//         )}
//         <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
//           {/* <h1 className="text-white text-3xl md:text-5xl font-bold">
//             {category.name} For Home
//           </h1> */}
//         </div>
//       </div>

//       {/* Description Section */}
//       <div className="w-full  px-4 py-6 mt-3 mx-auto">
//         <div className="bg-white rounded-lg shadow-lg p-6 relative overflow-hidden">
//           {/* Decorative circles (optional) */}
//           <div className="absolute top-0 left-0 w-24 h-24 bg-orange-100 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
//           <div className="absolute bottom-0 right-0 w-24 h-24 bg-orange-100 rounded-full opacity-30 translate-x-1/2 translate-y-1/2"></div>

//           <h2 className="text-2xl font-semibold text-orange-600 mb-4">
//             {category.name}
//           </h2>
//           <p className="text-gray-700 leading-relaxed">
           
//           </p>
//         </div>
//       </div>

//       {/* All Product /category */}

//       <h3 className="px-4 py-6">
//         All Products / {category.name}
//       </h3>

//       {/* Products */}

//       <div>

//       </div>



//     </div>
//   );
// }


'use client';

import Image from 'next/image';
import { useState } from 'react';
import SidebarFiltersClient from '../SidebarFilters/SidebarFilters';
import { Category } from '@/types/category';



interface Props {
  category: Category;
  allCategories: Category[];
}

export default function CategoryInfo({ category, allCategories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>(String(category.id));
  const [priceRange, setPriceRange] = useState<[number, number]>([79, 399]);

  return (
    <div className="w-full">
      {/* Banner */}
      <div className="relative w-full h-[350px] lg:h-[290px]">
        {category.banner ? (
          <Image
            src={category.banner}
            alt={category.name}
            fill
            className="object-contain h-full w-full"
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

      <h3 className="px-4 py-6">All Products / {category.name}</h3>

      {/* Product Section with Sidebar */}
      <div className="flex gap-6 px-4">
        <SidebarFiltersClient
          categories={allCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
        />

        {/* Placeholder for filtered products */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-white border p-4 rounded shadow text-center text-gray-500">
            Product Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}
