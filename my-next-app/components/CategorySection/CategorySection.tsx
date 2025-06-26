// import { fetchCategories } from "@/api/fetchCategories";
// import CategorySlider from "./CategorySlider.client";


// export default async function CategorySection() {
//   const categories = await fetchCategories();

//   return (
//     <section className="max-w-7xl px-4 sm:px-10 mt-5">
//       <h2 className="text-3xl font-bold ">Featured Categories</h2>
//       <p className="text-gray-600 mt-0.5 ">
//         Discover a variety of product categories tailored to your needs.
//       </p>
//       <hr className="mb-6 mt-3" />

//       <CategorySlider categories={categories} />
//     </section>
//   );
// }



import { fetchCategories } from "@/api/fetchCategories";
import CategorySlider from "./CategorySlider.client";

export default async function CategorySection() {
  const { categories } = await fetchCategories(); // ✅ destructure here

  return (
    <section className="max-w-7xl px-4 sm:px-10 mt-5">
      <h2 className="text-3xl font-bold">Featured Categories</h2>
      <p className="text-gray-600 mt-0.5">
        Discover a variety of product categories tailored to your needs.
      </p>
      <hr className="mb-6 mt-3" />

      <CategorySlider categories={categories} /> {/* ✅ pass only the array */}
    </section>
  );
}
