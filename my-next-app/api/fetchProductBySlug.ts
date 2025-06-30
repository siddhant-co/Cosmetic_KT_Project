export async function fetchProductBySlug(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/info/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("API error:", res.status, text);
      throw new Error("Product not found");
    }

    const data = await res.json();
    return data.data; // ✅ fixed here
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}
