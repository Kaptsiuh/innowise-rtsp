import { ProductCard } from "@/shared/components/ProductCard/ProductCard";
import type { Product } from "@/shared/types/product";
import { memo } from "react";

type Props = {
  products: Product[];
};

export const ProductList = memo(({ products }: Props) => {
  if (!products?.length) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        No products found
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} link={`/products/${p.id}`} />
      ))}
    </ul>
  );
});
