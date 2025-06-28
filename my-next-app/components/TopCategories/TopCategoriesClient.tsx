// 'use client';

// import React, { useState, useEffect } from 'react';

// type Category = {
//   id: number;
//   name: string;
//   imageUrl: string;
//   isDeleted: boolean;
//   sequence_number: number;
// };

// type Props = {
//   categories: Category[];
// };

// export default function TopCategoriesClient({ categories }: Props) {
//   const [selectedId, setSelectedId] = useState<number | null>(null);

//   useEffect(() => {
//     if (categories.length > 0) {
//       setSelectedId(categories[0].id); // default selection
//     }
//   }, [categories]);

//   return (
//     <section className="py-[32px] px-[40px] bg-gray-50">
//       <div className="mb-5">
//         <h2 className="text-3xl font-bold mb-2">Top Category Picks</h2>
//         <p className="text-gray-600 mb-2">
//           Discover the best products from our top categories.
//         </p>
//         <hr className="mb-3 mt-3" />
//       </div>

//       <div className="flex flex-wrap gap-4">
//         {categories.map((category) => (
//           <button
//             key={category.id}
//             onClick={() => setSelectedId(category.id)}
//             className={`px-[16px] py-[8px] rounded-full transition cursor-pointer ${
//               selectedId === category.id
//                 ? 'bg-purple-500 text-white'
//                 : 'bg-gray-200 '
//             }`}
//           >
//             {category.name}
//           </button>
//         ))}
//       </div>
//     </section>
//   );
// }

// 'use client';

// import React, { useState, useEffect } from 'react';
// import ProductCard from '../CommonComponents/ProductCard/ProductCard';
// import { Product } from '@/types/product';


// type Category = {
//   id: number;
//   name: string;
//   imageUrl: string;
//   isDeleted: boolean;
//   sequence_number: number;
// };



// type Props = {
//   categories: Category[];
// };

// export default function TopCategoriesClient({ categories }: Props) {
//   const [selectedId, setSelectedId] = useState<number | null>(null);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     if (categories.length > 0) {
//       setSelectedId(categories[0].id); // default selection
//     }
//   }, [categories]);

//   useEffect(() => {
//     if (selectedId !== null) {
//       fetchProductsByCategory(selectedId);
//     }
//   }, [selectedId]);

//   const fetchProductsByCategory = async (categoryId: number) => {
//     try {
//       setLoading(true);
//       const res = await fetch(
//         `https://ecom-testing.up.railway.app/product/category/${categoryId}`
//       );
//       const data = await res.json();
//       setProducts(data); // assuming API returns array of products
//     } catch (error) {
//       console.error('Failed to fetch products', error);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="py-[32px] px-[40px] bg-gray-50">
//       <div className="mb-5">
//         <h2 className="text-3xl font-bold mb-2">Top Category Picks</h2>
//         <p className="text-gray-600 mb-2">
//           Discover the best products from our top categories.
//         </p>
//         <hr className="mb-3 mt-3" />
//       </div>

//       <div className="flex flex-wrap gap-4 mb-6">
//         {categories.map((category) => (
//           <button
//             key={category.id}
//             onClick={() => setSelectedId(category.id)}
//             className={`px-[16px] py-[8px] rounded-full transition cursor-pointer ${
//               selectedId === category.id
//                 ? 'bg-purple-500 text-white'
//                 : 'bg-gray-200'
//             }`}
//           >
//             {category.name}
//           </button>
//         ))}
//       </div>

//       {loading ? (
//         <p>Loading products...</p>
//       ) : products.length > 0 ? (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500">No products found for this category.</p>
//       )}
//     </section>
//   );
// }




// 'use client';

// import { Product, ProductCategory } from '@/types/product';
// import React, { useState, useEffect } from 'react';
// import ProductCard from '../CommonComponents/ProductCard/ProductCard';

// type Props = {
//   categories: ProductCategory[];
// };

// export default function TopCategoriesClient({ categories }: Props) {
//   const [selectedId, setSelectedId] = useState<number | null>(null);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     if (categories.length > 0) {
//       setSelectedId(categories[0].id); // Auto-select first category
//     }
//   }, [categories]);

//   useEffect(() => {
//     if (selectedId !== null) {
//       fetchProductsByCategory(selectedId);
//     }
//   }, [selectedId]);

//   const fetchProductsByCategory = async (categoryId: number) => {
//     try {
//       setLoading(true);
//       const res = await fetch(`https://ecom-testing.up.railway.app/product/category/${categoryId}`);
//       const data = await res.json();

//       // Optional: Ensure the result is always an array
//       setProducts(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="py-8 px-10 bg-gray-50">
//       <div className="mb-5">
//         <h2 className="text-3xl font-bold mb-2">Top Category Picks</h2>
//         <p className="text-gray-600">Discover the best products from our top categories.</p>
//         <hr className="my-4" />
//       </div>

//       {/* Category Buttons */}
//       <div className="flex flex-wrap gap-3 mb-6">
//         {categories.map((category) => (
//           <button
//             key={category.id}
//             onClick={() => setSelectedId(category.id)}
//             className={`px-4 py-2 rounded-full transition ${
//               selectedId === category.id ? 'bg-purple-600 text-white' : 'bg-gray-200'
//             }`}
//           >
//             {category.name}
//           </button>
//         ))}
//       </div>

//       {/* Product List */}
//       {loading ? (
//         <p className="text-gray-500">Loading products...</p>
//       ) : products.length > 0 ? (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500">No products found in this category.</p>
//       )}
//     </section>
//   );
// }



'use client';

import { Product, ProductCategory } from '@/types/product';
import React, { useState, useEffect } from 'react';
import ProductCard from '../CommonComponents/ProductCard/ProductCard';

type Props = {
  categories: ProductCategory[];
};

export default function TopCategoriesClient({ categories }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedId(categories[0].id); // Auto-select first category
    }
  }, [categories]);

  useEffect(() => {
    if (selectedId !== null) {
      fetchProductsByCategory(selectedId);
    }
  }, [selectedId]);

  const fetchProductsByCategory = async (categoryId: number) => {
    try {
      setLoading(true);
      const res = await fetch(`https://ecom-testing.up.railway.app/product/category/${categoryId}`);
      const json = await res.json();
      console.log('API response:', json);

      const data = Array.isArray(json) ? json : json.data; // Support array or { data: [...] }
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8 px-10 bg-gray-50">
      <div className="mb-5">
        <h2 className="text-3xl font-bold mb-2">Top Category Picks</h2>
        <p className="text-gray-600">Discover the best products from our top categories.</p>
        <hr className="my-4" />
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedId(category.id)}
            className={`px-4 py-2 rounded-full transition ${
              selectedId === category.id ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-600">Loading products...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found in this category.</p>
      )}

      {/* Debug output */}
      <div className="mt-10">
        <h3 className="font-semibold mb-2">Debug Data:</h3>
        <pre className="bg-gray-100 p-4 text-sm overflow-x-auto rounded">
          {JSON.stringify(products, null, 2)}
        </pre>
      </div>
    </section>
  );
}
