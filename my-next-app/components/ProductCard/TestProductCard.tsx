'use client';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { mockProducts } from '@/api/mockProducts';


export default function ProductGrid() {
  return (
    <section className="my-8">

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
