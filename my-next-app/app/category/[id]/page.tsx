

// import CategoryInfo from "@/components/ServersideComponent/CategoryInfo/CategoryInfo";
// import { notFound } from "next/navigation";

// interface CategoryPageProps {
//   params: {
//     id: string;
//   };
// }

// export default async function CategoryPage({ params }: CategoryPageProps) {
//   // Fetch the selected category
//   const categoryRes = await fetch(`https://ecom-ahj1.onrender.com/category/${params.id}`, {
//     cache: "no-store",
//   });

//   if (!categoryRes.ok) return notFound();

//   const categoryData = await categoryRes.json();
//   const category = categoryData?.category;

//   if (!categoryData.success || !category) return notFound();

//   // Fetch all products
//   const productRes = await fetch("https://ecom-ahj1.onrender.com/product", {
//     cache: "no-store",
//   });

//   if (!productRes.ok) return notFound();

//   const productData = await productRes.json();
//   const allProducts = productData?.products || [];

//   // Filter products belonging to this category
//   const filteredProducts = allProducts.filter((product: any) => {
//     const productCategoryId =
//       typeof product.categoryId === "object" ? product.categoryId?.id : product.categoryId;
//     return String(productCategoryId) === String(params.id);
//   });

//   return (
//     <div>
//       <CategoryInfo
//         category={category}
//         products={filteredProducts}
//       />
//     </div>
//   );
// }



// app/category/[id]/page.tsx

// import CategoryInfo from "@/components/ServersideComponent/CategoryInfo/CategoryInfo";
// import { notFound } from "next/navigation";

// interface CategoryPageProps {
//   params: {
//     id: string;
//   };
// }

// interface Product {
//   id: string;
//   name: string;
//   categoryId: string | { id: string };
//   // Add other product fields if needed
// }

// interface Category {
//   id: string;
//   name: string;
//   // Add other category fields if needed
// }

// // ✅ Main entry function (must await props)
// export default async function CategoryPage(props: Promise<CategoryPageProps>) {
//   const { params } = await props;

//   return <CategoryContent params={params} />;
// }

// // ✅ Separated async logic
// async function CategoryContent({ params }: CategoryPageProps) {
//   // Fetch the selected category
//   const categoryRes = await fetch(`https://ecom-ahj1.onrender.com/category/${params.id}`, {
//     cache: "no-store",
//   });

//   if (!categoryRes.ok) return notFound();

//   const categoryData = await categoryRes.json();
//   const category: Category | undefined = categoryData?.category;

//   if (!categoryData.success || !category) return notFound();

//   // Fetch all products
//   const productRes = await fetch("https://ecom-ahj1.onrender.com/product", {
//     cache: "no-store",
//   });

//   if (!productRes.ok) return notFound();

//   const productData = await productRes.json();
//   const allProducts: Product[] = productData?.products || [];

//   // Filter products belonging to this category
//   const filteredProducts = allProducts.filter((product) => {
//     const productCategoryId =
//       typeof product.categoryId === "object" ? product.categoryId.id : product.categoryId;
//     return String(productCategoryId) === String(params.id);
//   });

//   return (
//     <div>
//       <CategoryInfo category={category} products={filteredProducts} />
//     </div>
//   );
// }

import CategoryInfo from "@/components/ServersideComponent/CategoryInfo/CategoryInfo";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { notFound } from "next/navigation";

export default async function CategoryPage(entry: Promise<{ params: { id: string } }>) {
  const { params } = await entry;
  const categoryId = Number(params.id); // Convert route param to number

  // Fetch category
  const categoryRes = await fetch(`https://ecom-ahj1.onrender.com/category/${categoryId}`, {
    cache: "no-store",
  });

  if (!categoryRes.ok) return notFound();

  const categoryData: { success: boolean; category?: Category } = await categoryRes.json();
  const category = categoryData.category;

  if (!categoryData.success || !category) return notFound();

  // Fetch all products
  const productRes = await fetch("https://ecom-ahj1.onrender.com/product", {
    cache: "no-store",
  });

  if (!productRes.ok) return notFound();

  const productData: { success: boolean; products?: Product[] } = await productRes.json();
  const allProducts: Product[] = productData.products ?? [];

  // Filter products by categoryId (which is a number)
  const filteredProducts = allProducts.filter((product) => product.categoryId === categoryId);

  return <CategoryInfo category={category} products={filteredProducts} />;
}
