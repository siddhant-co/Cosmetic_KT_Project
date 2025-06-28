
import { fetchProducts, Product } from '@/api/ProductCardApi';
import ProductCard from './ProductCard';


export default async function ProductGrid() {
  const products = await fetchProducts(); // You can make this dynamic

  return (
    <section className="my-8">
      <h2 className="text-xl font-bold mb-2">Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  
        <ProductCard/>
      </div>
    </section>
  );
}


