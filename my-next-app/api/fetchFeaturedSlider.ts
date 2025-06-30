// lib/getProducts.ts
export async function getProducts(limit: number = 5) {
  try {
    const res = await fetch('https://ecom-ahj1.onrender.com/product', {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch products');

    const data = await res.json();
    return data.products?.slice(0, limit) || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
