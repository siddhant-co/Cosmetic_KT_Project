// import { Category } from '@/types/category';
// import React from 'react';



// async function getCategories(): Promise<Category[]> {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category`, {
//       cache: 'no-store',
//     });

//     if (!res.ok) {
//       throw new Error('Failed to fetch categories');
//     }

//     const data = await res.json();

//     return data.categories
//       .sort((a: Category, b: Category) => a.sequence_number - b.sequence_number);
//   } catch (err) {
//     console.error('Error fetching categories:', err);
//     return [];
//   }
// }

// export default async function TopCategories() {
//   const categories = await getCategories();

//   return (
//     <section className="py-[32px] px-[40px] bg-gray-50">
//       <div className="mb-5">
//         <h2 className="text-3xl font-bold mb-2">Top Category Picks</h2>
//         <p className="text-gray-600 mb-1">
//           Discover the best products from our top categories.
//         </p>
//       </div>

//       {categories.length === 0 ? (
//         <p className="text-gray-500">No categories available.</p>
//       ) : (
//         <div className="flex flex-wrap gap-4">
//           {categories.map((category) => (
//             <button
//               key={category.id}
//               className="px-4 py-2 bg-gray-200 rounded-full hover:bg-purple-500 hover:text-white transition cursor-pointer"
//             >
//               {category.name}
//             </button>
//           ))}
//         </div>
//       )}
//       <hr className="mb-6 mt-3" />
//     </section>
//   );
// }

// app/components/TopCategories.tsx (server component)

// import { fetchTopCategories } from '@/api/fetchTopCategories';
// import TopCategoriesClient from './TopCategoriesClient';

// export default async function TopCategories() {
//   const categories = await fetchTopCategories();

//   return (
//     <TopCategoriesClient categories={categories} />
//   );
// }



// TopCategories.tsx
import { fetchTopCategories } from '@/api/fetchTopCategories';
import TopCategoriesClient from './TopCategoriesClient';

export default async function TopCategories() {
  const categories = await fetchTopCategories();

  return <TopCategoriesClient categories={categories} />;
}
