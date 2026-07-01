import { ProductsPagination } from "./ProductsPagination/ProductsPagination";
import { ProductList } from "./ProductList/ProductList";
import { useProducts } from "../hooks/useProducts";

export const Products = () => {
  const { products, isLoading, isError, error, pagination } = useProducts();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-red-500">Error: {error?.message}</div>
      </div>
    );
  }

  return (
    <>
      <ProductList products={products} />
      <ProductsPagination
        page={pagination.page}
        pages={pagination.pages}
        setPage={pagination.setPage}
        totalPages={pagination.totalPages}
      />
    </>
  );
};
