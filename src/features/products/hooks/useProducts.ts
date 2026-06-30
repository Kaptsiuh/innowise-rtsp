import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { productsApi } from "../api/productsApi";
import type { ProductsResponse } from "../types/product";

const ITEMS_PER_PAGE = 10;

function getPages(current: number, total: number) {
  const pages: (number | "...")[] = [];
  const range = 1;

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || Math.abs(i - current) <= range) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return pages;
}

export const useProducts = () => {
  const [page, setPage] = useState(1);

  const query = useQuery<ProductsResponse>({
    queryKey: ["products", page],
    queryFn: async ({ signal }) => {
      const data = await productsApi.getProducts(page, signal);
      return data as ProductsResponse;
    },
    placeholderData: keepPreviousData,
  });

  const totalPages = Math.ceil((query.data?.total || 0) / ITEMS_PER_PAGE);
  const pages = useMemo(() => getPages(page, totalPages), [page, totalPages]);

  return {
    products: query.data?.products || [],
    isLoading: query.isPending,
    isError: query.isError,
    error: query.error,
    pagination: {
      page,
      setPage,
      pages,
      totalPages,
    },
  };
};
