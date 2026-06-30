import { ProductsPagination } from "./ProductsPagination/ProductsPagination";
import { ProductList } from "./ProductList/ProductList";
import { useProducts } from "../hooks/useProducts";

export const Products = () => {
  const { products, isLoading, isError, error, pagination } = useProducts();

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error: {error?.message}</span>;

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
