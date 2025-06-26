'use client';


import { Products } from '@/api/testProductCardApi';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { mockProducts } from '@/api/mockProducts';


export default function ProductGrid() {
  return (
    <section className="my-8">
      <h2 className="text-xl font-bold mb-2">Hot Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mockProducts.map((product) => (
           <Link key={product.id} href={`/product/${product.slug}`}>
            <ProductCard key={product.id} product={product} />
            </Link>
        ))}
      </div>
    </section>
  );
}
