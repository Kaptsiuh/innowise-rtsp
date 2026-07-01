import { ProductList } from "./ProductList/ProductList";
import { useProducts } from "../hooks/useProducts";
import { ItemsPagination } from "@/shared/components";

export const Products = () => {
  const { items, isLoading, isError, error, pagination } = useProducts();

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
      <ProductList products={items} />
      <ItemsPagination
        page={pagination.page}
        pages={pagination.pages}
        setPage={pagination.setPage}
        totalPages={pagination.totalPages}
      />
    </>
  );
};
