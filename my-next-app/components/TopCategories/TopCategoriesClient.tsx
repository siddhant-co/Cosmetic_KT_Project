'use client';

import React, { useState, useEffect } from 'react';

type Category = {
  id: number;
  name: string;
  imageUrl: string;
  isDeleted: boolean;
  sequence_number: number;
};

type Props = {
  categories: Category[];
};

export default function TopCategoriesClient({ categories }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedId(categories[0].id); // default selection
    }
  }, [categories]);

  return (
    <section className="py-[32px] px-[40px] bg-gray-50">
      <div className="mb-5">
        <h2 className="text-3xl font-bold mb-2">Top Category Picks</h2>
        <p className="text-gray-600 mb-2">
          Discover the best products from our top categories.
        </p>
        <hr className="mb-3 mt-3" />
      </div>

      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedId(category.id)}
            className={`px-[16px] py-[8px] rounded-full transition cursor-pointer ${
              selectedId === category.id
                ? 'bg-purple-500 text-white'
                : 'bg-gray-200 '
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
}
