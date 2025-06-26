// // app/product/[slug]/page.tsx

// import { getSingleProduct } from "@/api/getSingleProduct";
// import { Product } from "@/api/ProductCardApi";
// import ProductDetailClient from "@/components/productDetailPage/ProductDetailPage";
// import { notFound } from "next/navigation";

// type Props = {
//   params: { slug: string };
// };

// export default async function Page({ params }: Props) {
//   const { slug } = params;

//   const product: Product | null = await getSingleProduct(slug);

//   if (!product) {
//     notFound();
//   }

//   return <ProductDetailClient product={product} />;
// }


// app/product/[slug]/page.tsx

import { notFound } from 'next/navigation';

import ProductDetailClient from '@/components/productDetailPage/ProductDetailPage';
import { mockProducts } from '@/api/mockProducts';
import { Products } from '@/api/testProductCardApi';


type Props = {
  params: { slug: string };
};

export default function Page({ params }: Props) {
  const { slug } = params;

  const product: Products | undefined = mockProducts.find(
    (product) => product.slug === slug
  );

  if (!product) return notFound();

  return <ProductDetailClient product={product} />;
}
