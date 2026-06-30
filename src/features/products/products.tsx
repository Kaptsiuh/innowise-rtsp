import { client } from "@/shared/api/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../../shared/components";
import { useState } from "react";

const ITEMS_PER_PAGE = 10;

export const Products = () => {
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: ["products", page],
    queryFn: async ({ signal }) => {
      try {
        const skip = (page - 1) * ITEMS_PER_PAGE;
        const response = await client.GET(`/products`, {
          params: {
            query: {
              limit: ITEMS_PER_PAGE,
              skip,
            },
          },
          signal,
        });
        return response.data;
      } catch (error) {
        throw new Error("API Error:", error);
      }
    },
    placeholderData: keepPreviousData,
  });

  if (query.isPending) return <span>Loading...</span>;
  if (query.isError) return <span>Error: {query.error.message}</span>;

  const totalPages = Math.ceil((query.data?.total || 0) / ITEMS_PER_PAGE);
  const pages = getPages(page, totalPages);

  return (
    <>
      <ul>
        {query.data.products.map((p) => (
          <li key={p.id}>
            <div>{p.brand}</div>
            <div>{p.description}</div>
            <div>{p.price}</div>
          </li>
        ))}
      </ul>

      <Pagination className="mt-6">
        <PaginationContent>
          {pages.map((item, i) => (
            <PaginationItem key={i}>
              {item === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={page === item}
                  onClick={() => setPage(item)}
                  className="cursor-pointer"
                >
                  {item}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </>
  );
};

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
