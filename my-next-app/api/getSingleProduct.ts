import { Product } from "./ProductCardApi";

export async function getSingleProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://ecom-testing.up.railway.app/product/info/${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch product');
    return await res.json();
  } catch (error: unknown) {
    console.error((error as Error).message);
    return null;
  }
}