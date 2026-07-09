import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink } from "@/shared/components";
import { memo, useCallback } from "react";

type Props = {
  page: number;
  pages: (number | "...")[];
  totalPages: number;
  setPage: (page: number) => void;
};

export const ItemsPagination = memo(({ page, pages, setPage, totalPages }: Props) => {
  if (totalPages <= 1) return null;

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        {pages.map((item, i) => (
          <PaginationItem key={i}>
            {item === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PageLink pageNum={item} isActive={page === item} setPage={setPage} />
            )}
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
});

const PageLink = memo(
  ({ pageNum, isActive, setPage }: { pageNum: number; isActive: boolean; setPage: (page: number) => void }) => {
    const handleClick = useCallback(() => {
      setPage(pageNum);
    }, [pageNum, setPage]);

    return (
      <PaginationLink isActive={isActive} onClick={handleClick} className="cursor-pointer">
        {pageNum}
      </PaginationLink>
    );
  },
);
