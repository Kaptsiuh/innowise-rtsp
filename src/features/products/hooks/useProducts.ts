import type { Product, ProductsResponse } from "@/shared/types/product";
import { productsApi } from "../api/productsApi";
import { usePaginatedQuery } from "@/shared/hooks/usePaginatedQuery";

export const useProducts = () => {
  return usePaginatedQuery<ProductsResponse, Product>({
    queryKey: ["products"] as const,
    queryFn: productsApi.getItems,
    selectItems: (data) => data.products ?? [],
  });
};
