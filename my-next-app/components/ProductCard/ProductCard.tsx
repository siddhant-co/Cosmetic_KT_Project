import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/types/product';
import { getProducts } from '@/api/fetchProduct';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products: Product[] = await getProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.slug}`}
          className="border rounded-lg p-4 shadow hover:shadow-lg transition"
        >
          <div className="w-full aspect-[4/3] relative mb-4">
            <Image
              src={product.images[0]?.image || '/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover rounded"
            />
          </div>
          <h2 className="font-semibold text-lg mb-1">{product.name}</h2>
          <p className="text-sm text-gray-500 mb-1">{product.category?.name}</p>
          <div className="flex items-center gap-2">
            <span className="font-bold text-black">₹{product.sellingPrice}</span>
            {product.basePrice !== product.sellingPrice && (
              <>
                <span className="line-through text-gray-400 text-sm">₹{product.basePrice}</span>
                <span className="text-green-600 text-sm">
                  {product.priceDifferencePercent > 0 ? `-${product.priceDifferencePercent}%` : ''}
                </span>
              </>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}


