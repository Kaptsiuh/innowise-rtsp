import { productsApi } from "../api/productsApi";
import type { Product, ProductsResponse } from "../types/product";
import { usePaginatedQuery } from "@/shared/hooks/usePaginatedQuery";

export const useProducts = () => {
  return usePaginatedQuery<ProductsResponse, Product>({
    queryKey: ["products"] as const,
    queryFn: productsApi.getItems,
    selectItems: (data) => data.products ?? [],
  });
};
