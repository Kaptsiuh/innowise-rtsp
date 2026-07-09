import { Products } from "@/features/products/ui/Products";

export const ProductsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Products</h1>
      <Products />
    </div>
  );
};
