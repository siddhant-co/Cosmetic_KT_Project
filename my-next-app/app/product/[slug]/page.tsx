// import { notFound } from "next/navigation";
// import ProductDetailClient from "@/components/productDetailPage/ProductDetailPage";
// import { mockProducts } from "@/api/mockProducts";
// import { Product } from "@/types/product";


// export default function Page({ params }: { params: { slug: string } }) {
//   const { slug } = params;

//   const product: Product | undefined = mockProducts.find(
//     (product) => product.slug === slug
//   );

//   if (!product) return notFound();

//   return <ProductDetailClient product={product} />;
// }




// app/product/[slug]/page.tsx

// import ProductDetailClient from "@/components/productDetailPage/ProductDetailPage";
// import { notFound } from "next/navigation";


// interface ProductPageProps {
//   params: { slug: string };
// }

// export default async function ProductPage({ params }: ProductPageProps) {
//   const res = await fetch(
//     `https://ecom-ahj1.onrender.com/product/slug/${params.slug}`,
//     { cache: "no-store" }
//   );

//   if (!res.ok) return notFound();

//   const data = await res.json();
//   const product = data?.product;

//   if (!data.success || !product) return notFound();

//   return (
//     <div className="bg-[#f3f4f6] py-10">
//       <ProductDetailClient product={product} />
//     </div>
//   );
// }


// import { fetchProductBySlug } from "@/api/fetchProductBySlug";
// import ProductDetailClient from "@/components/productDetailPage/ProductDetailPage";
// import { notFound } from "next/navigation";

// type Props = {
//   params: { slug: string };
// };

// export default async function ProductPage({ params }: Props) {
//   console.log("Slug:", params.slug); // check what slug is passed
//   const product = await fetchProductBySlug(params.slug);

//   if (!product) return notFound();

//   return (
//     <div>
//       <ProductDetailClient product={product} />
//     </div>
//   );
// }



// app/product/[slug]/page.tsx

import { fetchProductBySlug } from "@/api/fetchProductBySlug";
import ProductDetailClient from "@/components/productDetailPage/ProductDetailPage";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export default async function ProductPage({ params }: Props) {
  const slug = params.slug;

  // Debug: this line is safe
  console.log("Slug:", slug);

  const product = await fetchProductBySlug(slug);


  if (!product) return notFound();

  return (
    <div>
      <ProductDetailClient product={product}  />
    </div>
  );
}
function fetchCategories() {
  throw new Error("Function not implemented.");
}

