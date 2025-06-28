import { fetchCategories } from "@/api/fetchCategories";
import CategoryClientWrapper from "./CategoryClientWrapper";

export default async function CategorySection() {
  const { categories } = await fetchCategories();

  return (
    <section className="w-full px-4 sm:px-10 mt-10">
      <h2 className="text-3xl font-bold text-center mb-2">
        Featured Categories
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Discover a variety of product categories tailored to your needs.
      </p>

      {/* 👇 Pass data to client wrapper */}
      <CategoryClientWrapper categories={categories} />
    </section>
  );
}
