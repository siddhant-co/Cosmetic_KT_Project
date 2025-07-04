'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import SidebarFiltersClient from '@/components/ServersideComponent/SidebarFilters/SidebarFilters';
import { Category } from '@/types/category';
import { Product } from '@/types/product';
import ProductCard from '@/components/CommonComponents/ProductCard/ProductCard';
import SortDropdown from '../SortDropdown.tsx/SortDropdown';
import { Funnel } from 'lucide-react';

interface Props {
  categories: Category[];
  products: Product[];
}

type SortOrder = 'price_asc' | 'price_desc';

export default function ShopPageClient({ categories, products }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 3999]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('price_asc');

  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  // ✅ Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !searchQuery || product.name.toLowerCase().includes(searchQuery);

      const inCategory =
        selectedCategory === 'all' ||
        String(product.categoryId) === selectedCategory;

      const price = Number(product.sellingPrice);
      const inPriceRange = price >= priceRange[0] && price <= priceRange[1];

      return matchesSearch && inCategory && inPriceRange;
    });
  }, [products, searchQuery, selectedCategory, priceRange]);

  // ✅ Sort filtered products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const priceA = Number(a.sellingPrice);
      const priceB = Number(b.sellingPrice);

      if (sortOrder === 'price_asc') return priceA - priceB;
      if (sortOrder === 'price_desc') return priceB - priceA;
      return 0;
    });
  }, [filteredProducts, sortOrder]);

  return (
    <div>
      {/* Banner */}
      <div className="w-full h-[200px] relative">
        <Image
          src="/shopPage2.jpg"
          alt="Banner"
          fill
          className="rounded object-cover"
        />
      </div>

      <div className="mt-6 px-4 flex flex-col gap-4">
        {/* Header Row */}
        <div className="flex justify-between items-center">
          <div className="bg-[#966ad7] border lg:w-1/5 w-full border-gray-300 rounded h-12 flex items-center px-4 shadow-sm">
            <h1 className="text-base flex gap-0.5 font-semibold text-gray-800">   <Funnel /> Filter</h1>
          </div>

          <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </div>

        {/* Search info */}
        {searchQuery && (
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-gray-600">
              Showing results for: <strong>{searchQuery}</strong>
            </p>
            <button
              onClick={() => router.push('/shop')}
              className="text-sm text-blue-500 underline cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Main content */}
        <div className="flex gap-3">
          {/* Sidebar */}
          <SidebarFiltersClient
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
          />

          {/* Product grid */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-gray-500 text-center">
                No products found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
