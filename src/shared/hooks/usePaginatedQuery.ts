import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

interface UsePaginatedQueryOptions<T, I> {
  queryKey: readonly string[];
  queryFn: (page: number, signal?: AbortSignal) => Promise<T>;
  itemsPerPage?: number;
  initialPage?: number;
  selectItems: (data: T) => I[];
}

const DEFAULT_ITEMS_PER_PAGE = 10;
const PAGINATION_RANGE = 1;

function generatePages(currentPage: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 1) return [1];

  const pages: (number | "...")[] = [];

  for (let page = 1; page <= totalPages; page++) {
    const isFirst = page === 1;
    const isLast = page === totalPages;
    const isNearCurrent = Math.abs(page - currentPage) <= PAGINATION_RANGE;

    if (isFirst || isLast || isNearCurrent) {
      pages.push(page);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return pages;
}

export function usePaginatedQuery<T extends { total: number }, I>({
  queryKey,
  queryFn,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
  initialPage = 1,
  selectItems,
}: UsePaginatedQueryOptions<T, I>) {
  const [page, setPage] = useState(initialPage);

  const { data, isPending, isError, error } = useQuery({
    queryKey: [...queryKey, page],
    queryFn: ({ signal }) => {
      return queryFn(page, signal);
    },
    placeholderData: keepPreviousData,
  });

  const totalPages = Math.ceil((data?.total || 0) / itemsPerPage);
  const pages = useMemo(() => generatePages(page, totalPages), [page, totalPages]);
  const items = useMemo(() => (data ? selectItems(data) : []), [data, selectItems]);

  return {
    items,
    data,
    isLoading: isPending,
    isError,
    error: error as Error | null,
    pagination: {
      page,
      setPage,
      pages,
      totalPages,
    },
  } as const;
}
