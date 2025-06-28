// import { notFound } from "next/navigation";
// import ProductDetailClient from "@/components/productDetailPage/ProductDetailPage";
// import { mockProducts } from "@/api/mockProducts";
// import { Products } from "@/api/testProductCardApi";

// export default function Page({ params }: { params: { slug: string } }) {
//   const { slug } = params;

//   const product: Products | undefined = mockProducts.find(
//     (product) => product.slug === slug
//   );

//   if (!product) return notFound();

//   return <ProductDetailClient product={product} />;
// }
