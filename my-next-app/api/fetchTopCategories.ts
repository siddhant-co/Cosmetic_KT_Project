// lib/api.ts or directly in your server component file

// import { Category } from "@/types/category";

// export async function fetchTopCategories(): Promise<Category[]> {
//   try {
//     const res = await fetch(`https://ecom-ahj1.onrender.com/category`, {
//       cache: 'no-store',
//     });

//     if (!res.ok) {
//       throw new Error('Failed to fetch categories');
//     }

//     const data = await res.json();
//     return data.categories.sort((a: { sequence_number: number; }, b: { sequence_number: number; }) => a.sequence_number - b.sequence_number);
//   } catch (err) {
//     console.error('Error fetching categories:', err);
//     return [];
//   }
// }



// @/api/fetchTopCategories.ts
export async function fetchTopCategories() {
  const res = await fetch('https://ecom-ahj1.onrender.com/category');
  const json = await res.json();

  return json.categories || [];
}
