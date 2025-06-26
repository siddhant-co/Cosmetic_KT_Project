// app/components/HotListWrapper.tsx or wherever you're placing it
import { fetchProducts } from "@/api/ProductCardApi";
import HotListClient from "./HotListClient";

const HotListWrapper = async () => {
  const products = await fetchProducts(1, 8); // 👈 Server-side fetch

  return <HotListClient products={products} />;
};

export default HotListWrapper;
