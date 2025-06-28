import CategoryInfo from "@/components/ServersideComponent/CategoryInfo/CategoryInfo";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Fetch single category by ID
  const res = await fetch(`https://ecom-testing.up.railway.app/category/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const data = await res.json();
  const category = data?.category;

  if (!data.success || !category) return notFound();

  // ✅ Fetch all categories for sidebar
  const allRes = await fetch(`https://ecom-testing.up.railway.app/category`, {
    cache: "no-store",
  });

  if (!allRes.ok) return notFound();

  const allData = await allRes.json();
  const allCategories = allData?.categories || [];

  return (
    <div>
      <CategoryInfo category={category} allCategories={allCategories} />
    </div>
  );
}
