// D:\Cosmetic_KT\Cosmetic_KT_Project\my-next-app\app\category\[id]\page.tsx

import React from 'react'; // Keep this import for JSX interpretation
import CategoryInfo from "@/components/ServersideComponent/CategoryInfo/CategoryInfo";
import { notFound } from "next/navigation";
import type { Metadata } from 'next'; // For generateMetadata if you use it

// 1. Define the specific shape of your route parameters, similar to your ProductPage example
interface CategoryPageParams {
  id: string; // This matches the `[id]` in your folder structure
}

// 2. Define the props for your Page component, explicitly making 'params' a Promise
type CategoryPageProps = {
  params: Promise<CategoryPageParams>;
  // If you also use searchParams, they would also be a Promise:
  // searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Await the 'params' Promise and destructure the 'id' directly, just like in your ProductPage example
  const { id } = await params;
  const categoryId = id; // Renaming for clarity if preferred, or just use 'id' directly

  // Fetch single category by ID
  const res = await fetch(`https://ecom-testing.up.railway.app/category/${categoryId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error(`Failed to fetch category ${categoryId}:`, res.status, res.statusText);
    return notFound(); // Render 404 page
  }

  const data = await res.json();
  const category = data?.category;

  if (!data.success || !category) {
    console.error(`Category data not found or success is false for ID: ${categoryId}`, data);
    return notFound(); // Render 404 page
  }

  // ✅ Fetch all categories for sidebar
  const allRes = await fetch(`https://ecom-testing.up.railway.app/category`, {
    cache: "no-store",
  });

  if (!allRes.ok) {
    console.error("Failed to fetch all categories:", allRes.status, allRes.statusText);
    // Decide if you want to show notFound() here or just proceed with an empty sidebar
    // For now, let's return notFound if critical data is missing.
    return notFound();
  }

  const allData = await allRes.json();
  const allCategories = allData?.categories || [];

  return (
    <div>
      {/* Ensure CategoryInfo component is correctly imported and expects these props */}
      <CategoryInfo category={category} allCategories={allCategories} />
    </div>
  );
}

// Optional: For dynamic SEO metadata
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { id } = await params; // Await params here too
  const categoryId = id;

  return {
    title: `Category: ${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} - My Cosmetic Store`,
    description: `Explore products in the ${categoryId} category.`,
  };
}

// Optional: For Static Site Generation (SSG) if you know all possible category IDs at build time
// export async function generateStaticParams() {
//   // In a real app, you'd fetch all possible category IDs from your API
//   const res = await fetch(`https://ecom-testing.up.railway.app/category`);
//   const data = await res.json();
//   const categories = data?.categories || [];

//   return categories.map((category: any) => ({
//     id: category.id, // Assuming your category object has an 'id' property
//   }));
// }